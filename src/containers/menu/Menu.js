import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router';

import classes from './Menu.module.sass'
import Info from './info/Info';
import MyCourses from './myCourses/MyCourses';
import AddCourse from './addCourse/AddCourse';

const Menu = (props) => {   
    
    let redirect = null;

    let token = localStorage.getItem('token');
    if (token == null) redirect = <Redirect to="/"/>
    
    console.log('redirected')
    return (
        <div className={classes.Menu}>
            <div className={classes.MenuLinks}>
                <NavLink exact activeStyle={{color: '#4891ff ', backgroundColor: '#dbe9ff'}} className={classes.Link} to="/menu/info">INFO</NavLink>
                <NavLink activeStyle={{color: '#4891ff ', backgroundColor: '#dbe9ff'}} className={classes.Link} to="/menu/my-courses" >MY COURSES</NavLink>
                <NavLink activeStyle={{color: '#4891ff ', backgroundColor: '#dbe9ff'}} className={classes.Link} to="/menu/add-course">ADD COURSE</NavLink>
            </div>
            <div className={classes.MenuStaff}>
                <Switch>
                    <Route path="/menu/info" component={Info}/>
                    <Route path="/menu/my-courses" component={MyCourses}/>
                    <Route path="/menu/add-course" component={AddCourse}/>
                </Switch>
            </div>


            {redirect}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        localId: state.auth.localId
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
