import React from 'react'

import classes from './Backdrop.module.sass'

const Backdrop = (props) => {
    return (
        <div onClick={props.clicked} className={ props.show ? classes.Backdrop : null }></div>
    )
}

export default Backdrop
