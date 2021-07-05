import * as actionTypes from '../actionTypes'
import axios from 'axios'


export const setInfo = (name, surname, age) => {
    return {
        type: actionTypes.SET_USERS_INFO,
        name,
        surname,
        age
    }
}

export const setUsersInfo = (id, name, surname, age) => {
    return dispatch => {
        console.log('start')
        axios.delete('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '/personalInfo.json')
        .then( res => {
            
            axios.post('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + id + '/personalInfo.json', {name: name, surname: surname, age: age})
            .then( res => {
                localStorage.setItem('name', name);
                localStorage.setItem('surname', surname);
                localStorage.setItem('age', age);
                dispatch(setInfo(name, surname, age))
                console.log(res.data)
            } )

        } )
        .catch( err => {
            console.log(err)
        } )
    }
}

export const getUsersInfo = (name, surname, age) => {
    return {
        type: actionTypes.GET_USERS_INFO,
        name,
        surname,
        age
    }
}
