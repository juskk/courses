import React from 'react'
import {connect} from 'react-redux'

import classes from './AddCourse.module.sass'
import Input from '../../../components/UI/input/Input'
import Button from '../../../components/UI/button/Button'
import * as actionCreatore from '../../../redux/actions/index'

const AddCourse = (props) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const toAdd = (name, description) => {
        let author = props.userName + " " + props.userSurname;
        console.log('1')
        if (props.userName && props.userSurname) {
            if (props.userSurname.trim() !== '' && props.userName.trim() !== '') {
                console.log('2')
                props.onAddCourse(name, description, author)
                setName('')
                setDescription('')
            } 
        } else {
            alert('you need to enter some core information about yourself')
        }
    }

    return (
        <div className={classes.MainDiv}>
            <div className={classes.Inputes}>
                <div className={classes.InputesItem}>
                    <p style={{marginBottom: '-10px'}}>Name of the course:</p>
                    <Input value={name} onChange={ event => setName(event.target.value) } type="text"  />
                </div>
                <div className={classes.InputesItem}>
                    <p style={{marginBottom: '-10px'}}>Short description(120symb):</p>
                    <Input value={description} onChange={ event => setDescription(event.target.value) } type="text"  />
                </div>
            </div>
            <Button clicked = { () => toAdd(name, description) } access>ADD</Button>
        </div>
    )
}

    const mapStateToProps = state => {
        return {
            userName: state.user.name,
            userSurname: state.user.surname,
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            onAddCourse: (name, description, author) => dispatch(actionCreatore.toAddCourse(name, description, author))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse)
