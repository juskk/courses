import React from 'react'
import {connect} from 'react-redux'

import classes from './Info.module.sass'
import Input from '../../../components/UI/input/Input'
import Button from '../../../components/UI/button/Button'
import * as actionCreators from '../../../redux/actions/index'


const Info = (props) => {

    const [name, setName] = React.useState(props.name);
    const [surname, setSurname] = React.useState(props.surname);
    const [age, setAge] = React.useState(props.age);

    let button = null;

    if (name !== props.name || surname !== props.surname || age !== props.age) button = <Button clicked = { () => props.onSetInfo(props.userId, name, surname, age)} access >Submit changes</Button>

    return (
        <div style={{zIndex: '1000'}}>
            <p className={classes.Text}>Information about the current user</p>
            <p> <strong>Email:</strong> {props.email} </p>
            <div>
                <p><strong>Personal information:</strong></p>
                <div className={classes.PersonalInformation}>
                    <div>
                        <p>Name:</p> 
                        <Input onChange={ (event) => setName(event.target.value) } value={name} simple placeholder="name" type="text"/>
                    </div>
                    <div>
                        <p>Surname:</p> 
                        <Input onChange={ (event) => setSurname(event.target.value) } value={surname} simple placeholder="surname" type="text"/>
                    </div>
                    <div>
                        <p>Age:</p> 
                        <Input onChange={ (event) => setAge(event.target.value) } value={age} simple placeholder="age" type="text"/>
                    </div>
                    {button}
                </div>
            </div>
            <p> <strong>Courses viewing: </strong> 0  </p>
            <p> <strong>Courses added: </strong> 0 </p>
            <p> <strong>Courses finished: </strong> 0 </p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        name: state.user.name,
        surname: state.user.surname,
        age: state.user.age,
        userId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetInfo: (id, name, surname, age) => dispatch(actionCreators.setUsersInfo(id, name, surname, age))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
