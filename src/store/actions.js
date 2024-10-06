import axios from "axios"

const url = process.env.VUE_APP_API_URL



export default {
    async actionGetCourses({_}, params) {
        return await axios.
        get(url + "x_quo_coursehub_course", {
            params: params,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.VUE_APP_AUTH_USERNAME}:${process.env.VUE_APP_AUTH_PASSWORD}`)
            }
        })
        .then(res => {
            if (res.data) {
                return {
                    success: true,
                    data: res.data,
                    totalCount: parseInt(res.headers['x-total-count'], 10),
                    message: 'Fetched courses',
                }
            }
        })
        .catch( () => {
            return {
                success: false,
                message: 'Could not fetch courses!'
            }
        })
    },
    async actionSubscribe({commit}, subscriptionData) {
        return await axios.
        post(url + "x_quo_coursehub_course_subscription", subscriptionData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.VUE_APP_AUTH_USERNAME}:${process.env.VUE_APP_AUTH_PASSWORD}`)
            }
        })
        .then(res => {
            if (res.data) {
                commit('ADD_SUBSCRIPTION', subscriptionData.course)
                return {
                    success: true,
                    message: 'Subscribed!',
                }
            }
        })
        .catch( () => {
            return {
                success: false,
                message: 'Could not subscribe!'
            }
        })
    },
    async actionUnsubscribe({commit}, subscriptionId) {
        return await axios.
        delete(url + `x_quo_coursehub_course_subscription/${subscriptionId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.VUE_APP_AUTH_USERNAME}:${process.env.VUE_APP_AUTH_PASSWORD}`)
            }
        })
        .then(res => {
            if (res.status === 204) {
                commit('DELETE_SUBSCRIPTION', subscriptionId)
                return {
                    success: true,
                    message: 'Subscribed!',
                }
            }
        })
        .catch( () => {
            return {
                success: false,
                message: 'Could not subscribe!'
            }
        })
    },
    async actionGetSubscribed({commit}, learnerId) {
        return await axios.
        get(url + "x_quo_coursehub_course_subscription", {
            params: {
                sysparm_query: `learner=${learnerId}`,
                sysparm_fields: 'course, sys_id'
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${process.env.VUE_APP_AUTH_USERNAME}:${process.env.VUE_APP_AUTH_PASSWORD}`)
            }
        })
        .then(res => {
            if (res.data) {
                commit('FETCH_SUBSCRIBED_COURSES', res.data.result)
                return {
                    success: true,
                    data: res.data,
                    message: 'Fetched subscribed course ids',
                }
            }
        })
        .catch( () => {
            return {
                success: false,
                message: 'Could not fetch subscribed course ids',
            }
        })
    },
}