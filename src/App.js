import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import {connect} from 'react-redux'
import React from 'react';

import Header from './containers/header/Header';
import Main from './containers/main/Main';
import Courses from './containers/courses/Courses';
import * as actionCreators from './redux/actions/index'

import Menu from './containers/menu/Menu';


function App(props) {

  React.useEffect( () => {
    props.onAuth()
    console.log('localStorage used')
  })

  return (
    <div className="App">
      <Header />
    
      <div style={{marginTop: '2vh'}}>
          <Switch>
            <Route path="/menu" component={Menu}/>
            <Route path="/courses" component={Courses} />
            <Route path="/" component={Main}/>
          </Switch> 
      </div>

      <p style={{position: 'fixed', left: '24px', bottom: '-5px', color: '#ccc', letterSpacing: '2px'}}>version 0.0.1</p>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch(actionCreators.auth())
  }
}

export default connect(null, mapDispatchToProps)(App);
