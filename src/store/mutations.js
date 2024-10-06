
export default {
    FETCH_SUBSCRIBED_COURSES(state, data) {
        state.subscribedCourses = data
    },
    ADD_SUBSCRIPTION(state, data) {
        state.subscribedCourses.push(data)
    },
    DELETE_SUBSCRIPTION(state, data) {
       state.subscribedCourses = state.subscribedCourses.filter(id => id !== data)
    }
}