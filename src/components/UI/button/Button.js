import React from 'react'

import classes from './Button.module.sass'

const Button = (props) => {
    
    let styles = [classes.Button];

    if (props.disabled) styles.push(classes.Disabled)
    else if (props.access) styles.push(classes.True)
    else styles.push(classes.False)

    let click = props.clicked;
    if (props.disabled) click = null;

    return (
        <div style={props.style} onClick={click} className={styles.join(' ')}>{props.children}</div>
    )
}

export default Button
