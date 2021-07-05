import * as actionTypes from '../actionTypes'

const innerState = {
    courses: [],
    error: false,
    loading: false,
    usersCourses: [],
    exist: false,
    disabled: null,
}

const courses = (state = innerState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_COURSES:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case actionTypes.LOADED_COURSES:
            const newCourses = [];
            for (let course in action.courses) {
                newCourses.push(action.courses[course])
            }
            return {
                ...state,
                loading: false,
                courses: newCourses,
            }
        case actionTypes.LOADING_ERROR_COURSES:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.LOAD_USERS_COURSES:
            const crs = [];
            for (let course in action.courses) {
                crs.push(action.courses[course])
            }
            return {
                ...state,
                loading: false,
                usersCourses: crs
            }
        case actionTypes.ADD_COURSE:
            return {
                ...state
            }
        case actionTypes.EXISTENCE_CHECK:
            return {
                ...state,
                exist: true,
            }
        case actionTypes.CHEACK_BUTTON:
            return {
                ...state,
                disabled: action.disabled
            }
        default:
            return {
                ...state
            }
    }
}

export default courses