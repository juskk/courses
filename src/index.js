import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux';
import courses from './redux/reducers/courses';
import auth from './redux/reducers/auth';
import user from './redux/reducers/user';
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
  courses: courses,
  auth: auth,
  user: user,
})

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const store = createStore(rootReducer, composeEnhancers(
   applyMiddleware(thunk)
 ))


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


