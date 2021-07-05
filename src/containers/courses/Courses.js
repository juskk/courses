import React from 'react'
import {connect} from 'react-redux'

import classes from './Courses.module.sass'
import Loader from '../../components/loader/Loader'
import Course from '../../components/course/Course'
import Button from '../../components/UI/button/Button'
import * as actionCreators from '../../redux/actions/index'

const Courses = (props) => {

    React.useEffect( () => {
        window.addEventListener('scroll', widthCheacker );
        props.onLoadCourses();
        // eslint-disable-next-line
     }, [] )

    React.useEffect( () => {

    }, [props.disabled] )

    //work with height scroll

    const [goUp, setGoUp] = React.useState(false);

    let styles = [classes.GoUp]
    if (goUp) styles.push(classes.Show);
    else styles.push(classes.Hide)

    const widthCheacker = () => {
        if (window.pageYOffset > 90) setGoUp(true)
        else setGoUp(false)
    }

    const toScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }



    //current course

    const addCourse = (type, name, description, author) => {
        if (props.userId) {
            props.onLikeUnlikeCourse(type, props.userId, name, description, author)
        } else {
            console.log('u need to auth')
        }
    }

    const [currentCourse, setCurrentCourse] = React.useState(null);

    let currentCourseDiv = <p style={{color: 'red', letterSpacing: '3px'}}><strong>Choose a course</strong></p>;

    if (currentCourse) {
        props.onCheackButton(props.userId, currentCourse.name, currentCourse.description, currentCourse.author)
    }
    console.log(props.disabled)
    if (currentCourse) currentCourseDiv = (
        <div>
            <p style={{ wordWrap: 'break-word'}}><strong>Name: </strong>{currentCourse.name}</p>
            <p style={{ wordWrap: 'break-word'}}><strong>Short description: </strong>{currentCourse.description}</p>
            <p style={{ wordWrap: 'break-word'}}><strong>The author: </strong>{currentCourse.author}</p>
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                <Button disabled={props.disabled} style={{margin: '10px'}} clicked = { () => addCourse('like', currentCourse.name, currentCourse.description, currentCourse.author)} access>Add</Button>
                <Button disabled={!props.disabled} style={{margin: '10px'}} clicked = { () => addCourse('unlike', currentCourse.name, currentCourse.description, currentCourse.author)} >Remove</Button>
            </div>

        </div>
    )

    let courses  =  props.courses.map( (cr, i) => {
                    return <Course 
                        key={cr.name + cr.author + i} 
                        name={cr.name} 
                        author={cr.author}
                        clicked={ () => setCurrentCourse({name: cr.name, author: cr.author, description: cr.description})}/>
                    } )
    
    if (props.loading) courses = <div style={{marginTop: '10vh'}}><Loader /></div>



    return (
        <div className={classes.CoursesPage}>
            <p className={classes.Title}> Here you can find all the courses we can offer you </p>

            <div className={classes.SelectedCourse}>
                <p style={{marginTop: '-70px', fontSize: '20px', fontWeight: '700', letterSpacing: '3px'}}>Information about the chosen course:</p>
                <div style={{maxWidth: '80%', width: '100%', margin: '0 auto', marginTop: '50px', maxHeight: '80%', height: '100%'}} >
                    {currentCourseDiv}
                </div>
            </div>
            

            <div className={classes.Courses} >
                {courses}
            </div>

            <div  onClick={ toScroll } className={styles.join(' ')}><p style={{color: 'white', paddingTop:"13px", cursor: 'pointer'}}>UP</p></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses.courses,
        loading: state.courses.loading,
        auth: state.auth.authenticating,
        userId: state.auth.localId,
        disabled: state.courses.disabled
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCourses: () => dispatch(actionCreators.loadingCourses()),
        onLikeUnlikeCourse: (type, userId, name, description, author) => dispatch(actionCreators.likeUnlikeCourse(type, userId, name, description, author)),
        onCheackButton: (id, n, d, a) => dispatch(actionCreators.cheackingButton(id, n, d, a))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)