<template>
    <div class="custom-spinner" v-if="isLoading">
        <BSpinner />
    </div>
    <div class="course-view-container">
        <h2 class="pb-4">Courses Catalog</h2>
        <div class="cards-container">
            <div v-if="items.length == 0 && fetched" >
                <div> No Courses Available</div>
            </div>
            <div v-else>
                <BCardGroup deck v-for="(row, rowIndex) in chunkedItems" :key="'card-group-' + rowIndex">
                    <BCard
                        v-for="(item, itemIndex) in row" :key="item.sys_id"
                        border-variant="primary"
                        :title="item.title"
                        header-tag="header"
                        footer-tag="footer"
                        class="mb-4 "
                    >
                        <template #header>
                            <div class="custom-card custom-card-header">
                                <div>{{ "Attendance " + capitalizeFirstLetter(item.type) }}</div>
                                <div>{{ item.duration }}</div>

                            </div>
                        </template>

                        <BCardText class="custom-card custom-card-text">
                            {{ item.description }}
                        </BCardText>
                        
                        <template #footer>
                            <div class="custom-card custom-card-footer">
                                <BButton
                                    variant="primary"
                                    @click="subscribe(item.sys_id, rowIndex, itemIndex)"
                                    :loading="btnLoadingState[rowIndex]?.[itemIndex]">
                                    Subscribe
                                </BButton>
                            </div>
                        </template>
                    </BCard>
                </BCardGroup>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import { toast } from 'vue3-toastify';
    import { reactive } from 'vue';
    export default {
        name: 'CoursesView',
        data() {
            return {
                cardsPerRow: 3,
                items: [],
                isLoading: true,
                fetched: false,
                btnLoadingState: [],
            }
        },
        computed: {
            ...mapGetters(['learnerId', 'subscribedCourses']),
            chunkedItems() {
                const chunked = [];
                for (let i = 0; i < this.items.length; i += this.cardsPerRow) {
                    chunked.push(this.items.slice(i, i + this.cardsPerRow));
                }
                return chunked;
            },
        },
        methods: {
            ...mapActions(['actionGetCourses', 'actionSubscribe', 'actionGetSubscribed']),
            async getCourses() {
                this.isLoading = true
                const params = {sysparm_fields: 'title,description,duration,type,sys_id'}
                const res = await this.actionGetCourses(params)
                if (res.success) {
                    this.items = this.convertDuration(res.data.result)
                    this.btnLoadingState = reactive(Array(this.items.length).fill(null).map(() => Array()))
                }
                else {
                    toast.error('Could not Fetch courses!')
                }
                this.isLoading = false
            },
            convertDuration(courses) {
                if (courses) {
                    let arrSubCourseIds = this.subscribedCourses.map(item => item.course.value)
                    return courses.map(course => {
                        // Filter out subscribed courses
                        if (arrSubCourseIds && arrSubCourseIds.includes(course.sys_id)) {
                            return null
                        }
                        
                        const durationDate = new Date(course.duration)
                        const epochDate = new Date('1970-01-01 00:00:00')
                        const diffInMs = durationDate - epochDate

                        const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
                        const diffHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000* 60 * 60))
                        const diffMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
                        const diffSeconds = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000));

                        let duration = ""
                        if (diffDays > 0) {
                            duration = `${diffDays} Day${diffDays > 1 ? 's' : ''}`
                        }
                        else if (diffHours > 0) { 
                            duration = `${diffHours} Hour${diffHours > 1 ? 's' : ''}`;
                        }
                        else if (diffMinutes > 0) { 
                            duration = `${diffMinutes} Minute${diffMinutes > 1 ? 's' : ''}`;
                        }
                        else {
                            duration = `${diffSeconds} Second${diffSeconds> 1 ? 's' : ''}`;
                        }

                        return {
                            ...course,
                            duration: duration
                        }
                    }).filter(course => course !== null)
                }
                return []
            },
            async getSubscribedCourses() {
                this.isloadingBtn = true
                const res = await this.actionGetSubscribed(this.learnerId)
                this.isloadingBtn = false
            },
            async getResources() {
                await this.getSubscribedCourses()
                await this.getCourses()
                this.fetched = true
            },
            async subscribe(courseId, cardRowIndex, cardIndex) {
                const subscriptionData = {
                    learner: this.learnerId,
                    course: courseId
                }
                this.btnLoadingState[cardRowIndex][cardIndex] = true
                const res = await this.actionSubscribe(subscriptionData)
                if (res.success) {
                    toast.success('Subscribed!')
                    this.items= this.items.filter(item => item.sys_id !== courseId)
                }
                else {
                    toast.error('Could not subscribe!')
                }
                this.btnLoadingState[cardRowIndex][cardIndex] = false
            },
            capitalizeFirstLetter(str) {
                if (!str) return str
                return str.charAt(0).toUpperCase() + str.slice(1)
            },
        },
        mounted() {
            this.getResources()
        }
    }
</script>

<style scoped lang="scss">
.course-view-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-left: 2rem;
    padding-right: 2rem;
    height: calc(100% - 4.6rem);

}

.cards-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 1rem;
    margin-bottom: 0.5rem;
    // border: 1px solid black;
    // border-radius: 0.5rem;
    max-height: calc(100% - 7rem);
    overflow-y: auto;
}

.custom-card {
    display: flex;
    align-items: center;
    width: 100%;

    &-header {
        justify-content: space-between;
        text-overflow: ellipsis
    }

    &-text {
        text-align: left;
    }

    &-footer {
        justify-content: flex-end;
    }
}
</style>
