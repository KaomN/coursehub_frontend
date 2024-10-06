import { createStore } from 'vuex'
import actions from '@/store/actions'
import getters from '@/store/getters'
import mutations from '@/store/mutations'

const store = createStore({
    state: {
        learnerId: '4cb8c03a83305210c7549796feaad39d',
        subscribedCourses: null,
    },
    mutations: mutations,
    actions: actions,
    getters: getters
})
  
export default store;