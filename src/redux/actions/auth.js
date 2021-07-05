import * as actionTypes from '../actionTypes'
import axios from 'axios'

export const switchAuthenticating = (authType) => {
    return {
        type: actionTypes.SWITCH_AUTHENTICATING,
        authType: authType,
    }
}

//

export const startAuth = () => {
    return {
        type: actionTypes.START_AUTH
    }
}

export const authSuccess = (idToken, localId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId,
        email,
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err,
    }
}

export const authLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("age");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logOut = (time) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(authLogOut())
        }, time * 1000)
    }
}

export const toAuth = (method, email, password, onUserInfo) => {
    return dispatch => {
        dispatch(startAuth());
        let link = null;
        let info = {email: email, password: password, returnSecureToken: true}
        if (method === 'log in') link = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYIOE_1n0HO3r_43_P1MVdUtz5uXrF658';
        else if (method === 'sign up') link = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYIOE_1n0HO3r_43_P1MVdUtz5uXrF658';
    
        axios.post(link, info)
        .then( res => {
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("id", res.data.localId);
            localStorage.setItem('email', res.data.email)
            localStorage.setItem('expiresIn', new Date(new Date().getTime() + res.data.expiresIn * 1000));
            dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email))
            dispatch(logOut(res.data.expiresIn))
            
            if (method === "sign up") axios.post('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + res.data.localId + '/usersCourses.json', {name: 'introduction', author: 'int', description: 'int'})
            .then( () => {
                console.log('users courses folder created') })
            .catch( () => {
                console.log('users courses folder: error')
            } )
            if (method === "sign up") axios.post('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + res.data.localId + '/personalInfo.json', {name: '', surname: '', age: ''})
            .then( () => {
                console.log('users info folder created') })
            .catch( () => {
                console.log('users info folder: error')
            } )
            axios.get('https://coursebase-72487-default-rtdb.europe-west1.firebasedatabase.app/users/' + res.data.localId + '/personalInfo.json')
            .then( res => {
                let name, surname, age;
                for (let item in res.data) {
                    name = res.data[item].name;
                    surname = res.data[item].surname;
                    age = res.data[item].age;
                }
                localStorage.setItem("name", name);
                localStorage.setItem("surname", surname);
                localStorage.setItem("age", age);
                onUserInfo(name, surname, age)
            } )
        } )
        .catch( err => {
            dispatch(authFail(err.response.data.error))
        } )
        
    }
}

export const auth = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        if (token) {
            let expiresIn = new Date(localStorage.getItem("expiresIn"));
            if ( expiresIn > Date.now() ) {
                let id = localStorage.getItem('id');
                let email = localStorage.getItem('email')
                dispatch(authSuccess(token, id, email))
                dispatch(logOut( ( expiresIn.getTime() - new Date().getTime() ) / 1000) )
            } else dispatch(authLogOut() );
        } else dispatch(authLogOut())
        
    }
}