import React from 'react'
import {connect} from 'react-redux'

import Course from '../../../components/course/Course'
import * as actionCreators from '../../../redux/actions/index'
import Loader from '../../../components/loader/Loader'



const MyCourses = (props) => {
    React.useEffect( () => {
        props.onLoadUsersCourses(props.user)
        // eslint-disable-next-line
    }, [props.user] )

    let myCourses = (
        <div>
            {props.usersCourses.map( (course, i) => {
                return <Course key={course + i} name={course.name} author={course.author}/>
            } )}
        </div>
    )

    if (props.loading) myCourses = <div style={{marginTop: '5vh'}}><Loader /></div>

    return myCourses
}

const mapStateToProps = state => {
    return {
        user: state.auth.localId,
        usersCourses: state.courses.usersCourses,
        loading: state.courses.loading,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoadUsersCourses: (user) => dispatch(actionCreators.loadingUsersCourses(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses)
