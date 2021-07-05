import React from 'react'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.module.sass'

const Modal = (props) => {

    let styles = [classes.Modal];

    if (props.show) styles.push(classes.Show)
    else styles.push(classes.Hide)

    return (
        <div>
            <div className={styles.join(' ')}>
                {props.children}
            </div>
            <Backdrop clicked={props.clicked} show={props.show}/>
        </div>
    )
}

export default Modal
