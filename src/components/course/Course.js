import React from 'react'

import classes from './Course.module.sass'

const Course = (props) => {
    return (
        <div onClick={props.clicked} className={classes.Course}>
            <p> <strong>Course name:</strong> "{props.name}" <strong>by:</strong> "{props.author}" </p>  
        </div>
    )
}

export default Course
