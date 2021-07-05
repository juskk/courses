import * as actionTypes from '../actionTypes'

import axios from 'axios'

export const loadCourses = () => {
    return {
        type: actionTypes.LOAD_COURSES,
    }
}

export const loadedCourses = (courses) => {
    return {
        type: actionTypes.LOADED_COURSES,
        courses: courses
    }
}

export const loadingError = (err) => {
    return {
        type: actionTypes.LOADING_ERROR_COURSES,
        error: err,
    }
}

export const usersCourses = (courses) => {
    return {
        type:actionTypes.LOAD_USERS_COURSES,
        courses,
    }
}

//the function
export const loadingCourses = () => {
    return dispatch => {
        dispatch(loadCourses());
        axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/courses.json')
        .then( res => {
            console.log(res.data)
            dispatch(loadedCourses(res.data))
        } )
        .catch( error => {
            dispatch(loadingError(error))
        } )
    }
}

export const loadingUsersCourses = (user) => {
    return dispatch => {
        dispatch(loadCourses());
        axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + user + '/usersCourses.json')
        .then( res => {
            console.log(res.data)
            dispatch(usersCourses(res.data))
        } )
        .catch( error => {
            console.log(error)
            dispatch(loadingError(error))
        } )
    }
}

export const addCourse = () => {
    return {
        type: actionTypes.ADD_COURSE
    }
}

export const toAddCourse = (name, description, author) => {
    return dispatch => {
        axios.post('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/courses.json', {name: name, description: description, author: author} )
        .then( res => {
            dispatch(addCourse())
            console.log(res)
        } )
        .catch( err => {
            console.log(err)
        } )
    }
}

export const checking = () => {
    return {
        type: actionTypes.EXISTENCE_CHECK
    }
}

export const checkTheCourse = (userId, name, description, author) => {
    return dispatch => {
        let ret = false;
        axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses.json')
        .then( res => {
            for (let item in res.data) {
                if (res.data[item].name === name && res.data[item].description === description && res.data[item].author === author) {
                    ret = true;
                    console.log('sadasd')
                    dispatch(checking())
                }
            }
        } )
        return ret
    }
}

export const likeCourse = () => {
    return {
        type: actionTypes.LIKE_COURSE,
    }
}

export const unlikeCourse = () => {
    return {
        type: actionTypes.UNLIKE_COURSE,
    }
}

export const checkButton = (info) => {
    let disabled;
    if (info) disabled = true;
    else disabled = false;
    return {
        type: actionTypes.CHEACK_BUTTON,
        disabled
    }
}

export const cheackingButton = (userId, name, description, author) => {
    return dispatch => {
        let num = 0; 
            axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses.json')
            .then( res => {
                for (let item in res.data) {
                    if (res.data[item].name === name && res.data[item].description === description && res.data[item].author === author) {
                        num = num + 1
                    }
                }
                
                if (num>0) dispatch(checkButton(true))
                else dispatch(checkButton(false))
            } )
    }
}

export const likeUnlikeCourse = (type, userId, name, description, author) => {
    return dispatch => {

        if (type === "like") {
            
            axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses.json')
            .then( res => {
                for (let item in res.data) {
                    if (res.data[item].name === name && res.data[item].description === description && res.data[item].author === author) {
                        return true
                    }
                }
                axios.post('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses.json', {name: name, author: author, description: description})
                .then( res => {
                    console.log('step 2')
                    dispatch(likeCourse())
                    dispatch(cheackingButton(userId, name, description, author))
                } )
                .catch( err => {
                    console.log(err)
                } )
                return false
            } )
            
 
        } 
        else if (type ==="unlike") {
            axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses.json')
            .then( res => {
                for (let item in res.data) {
                    if (res.data[item].name === name && res.data[item].description === description && res.data[item].author === author) {
                        axios.delete('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + userId + '/usersCourses/' + item + '.json')
                        .then( res => {
                            dispatch(unlikeCourse())
                            dispatch(cheackingButton(userId, name, description, author))
                            console.log(res)
                        })
                        .catch( err => {
                            console.log(err)
                        } )
                    }
                }
            } )
            
        }
        console.log('z')
        

    }
}


