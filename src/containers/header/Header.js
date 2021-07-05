import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import * as actionCreators from '../../redux/actions/index'

import Modal from '../../components/UI/Modal/Modal'
import classes from './Header.module.sass'
import Button from '../../components/UI/button/Button'
import Input from '../../components/UI/input/Input'

const Header = (props) => {

    let modal = null;
    // eslint-disable-next-line
    const [valid, setValid] = React.useState(false)
    const [email, setEmail] = React.useState({
        value: '', 
        validation: {
            required: true, 
        },
        valid: false,
        })

    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');        
    const [password, setPassword] = React.useState({
        value: '', 
        validation: {
            required: true, 
            minLength: 6 
        },
        valid: false,
    })
    const [emailLogIn, setEmailLogIn] = React.useState({
        value: '', 
        validation: {
            required: true, 
        },
        valid: false,
        })
    const [passwordLogIn, setPasswordLogIn] = React.useState({
        value: '', 
        validation: {
            required: true, 
            minLength: 6 
        },
        valid: false,
    })

    React.useEffect( () => {
        if (password2 === password1) setPassword({...password, value: password2})
        else setPassword({...password, value: ''})
        // eslint-disable-next-line
    }, [password1, password2] )

    if (props.authType === "sign up") modal = (
        <div className={classes.ModalDiv}>
            <p style={{marginTop: '5vh'}}><strong>Well, it's time to sign up!</strong></p>
            <div className={classes.PartDiv}>
                <p className={classes.PartText}>email:</p>
                <Input value={email.value} onChange={ (event) => setEmail({...email, value: event.target.value}) } placeholder=" " type="email"/>
            </div>
            <div className={classes.PartDiv}>
                <p className={classes.PartText}>password:</p>
                <Input value={password1} onChange={ event => setPassword1(event.target.value) } placeholder=" " type="password"/>
            </div>
            <div className={classes.PartDiv}>
                <p className={classes.PartText}>confrim your password:</p>
                <Input value={password2} onChange={ event => setPassword2(event.target.value) } placeholder=" " type="password"/>
            </div>
            <div style={{marginBottom: '5vh'}}><Button clicked={ () => props.onStartAuth(props.authType, email.value, password.value, props.onUserInfo) } access>SIGN UP</Button></div>
        </div>
    )
    else if (props.authType === "log in") modal = (
        <div className={classes.ModalDiv}>
            <p style={{marginTop: '5vh'}}><strong>Please, log in</strong></p>
            <div className={classes.PartDiv}>
                <p className={classes.PartText}>email:</p>
                <Input value={emailLogIn.value} onChange={ (event) => setEmailLogIn({...emailLogIn, value: event.target.value}) } placeholder=" " type="email"/>
            </div>
            <div className={classes.PartDiv}>
                <p className={classes.PartText}>password:</p>
                <Input value={passwordLogIn.value} onChange={ (event) => setPasswordLogIn({...passwordLogIn, value: event.target.value}) } placeholder=" " type="password"/>
            </div>
            <div style={{marginBottom: '5vh'}}><Button clicked={ () => props.onStartAuth(props.authType, emailLogIn.value, passwordLogIn.value, props.onUserInfo) } access>LOG IN</Button></div>
        </div>
    )

    let menu = (
        <div className={classes.HeaderPart}>
            <p onClick={ () => props.onLogout()} style={{color: 'white', margin: 'auto', cursor: 'pointer'}}>LOG OUT</p>
        </div>
    )

    if (!props.idToken) menu = (
        <div className={classes.HeaderPart}>
            <p onClick={ () => props.onAuth("sign up") } className={classes.HeaderLink} >sign up</p>
            <p style={{color: 'white', marginTop: '14px'}}>/</p>
            <p onClick={ () => props.onAuth("log in") } className={classes.HeaderLink} >log in</p>   
        </div>
    )

    return (
        <div className={classes.Header}>
            <div className={classes.Container}>
                <div className={classes.HeaderPart}>
                    <p className={classes.HeaderImg} >CRɔ</p>
                    <NavLink exact activeStyle={{color: '#7d91ff'}} className={classes.HeaderLink}  to="/">info</NavLink>
                    <NavLink activeStyle={{color: '#7d91ff'}} className={classes.HeaderLink}  to="/courses">courses</NavLink>
                    { props.idToken ? <NavLink activeStyle={{color: '#7d91ff'}} className={classes.HeaderLink} to="/menu">menu</NavLink> : null }
                </div>

                {menu}
            </div>
            <Modal clicked={ () => props.onAuth() } show={props.auth}>
                {modal}
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.authenticating,
        authType: state.auth.authType,
        idToken: state.auth.idToken,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (authType) => dispatch(actionCreators.switchAuthenticating(authType)),
        onStartAuth: (method, email, password, func) => dispatch(actionCreators.toAuth(method, email, password, func)),
        onLogout: () => dispatch(actionCreators.authLogOut()),
        onUserInfo: (name, surname, age) => dispatch(actionCreators.getUsersInfo(name, surname, age))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)