import * as actionTypes from '../actionTypes'
// let theName = '', theSurname = '', theAge = '';
// if (localStorage.getItem('name')) {
//     theName = localStorage.getItem('name');
//     theSurname = localStorage.getItem('surname');
//     theAge = localStorage.getItem('age');
// }

const innerState = {
    name: localStorage.getItem('name'),
    surname: localStorage.getItem('surname'),
    age: localStorage.getItem('age'),
    coursesAdded: 0,
    coursesReading: 1,
    coursesFinished: 0,
}

const user = (state = innerState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_INFO:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                age: action.age
            }
        case actionTypes.GET_USERS_INFO:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                age: action.age
            }
        default: 
            return {
                ...state
            }
    }
}

export default user