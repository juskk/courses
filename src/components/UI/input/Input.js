import React from 'react'

import classes from './Input.module.sass'

const Input = (props) => {
    
    let styles = [classes.Input]

    if (props.simple) styles.push(classes.Simple)

    return (
        <input value={props.value} onChange={props.onChange} className={styles.join(' ')} placeholder={props.placeholder} type={props.type}/>
    )
}

export default Input