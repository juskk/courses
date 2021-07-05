import React from 'react'
import {connect} from 'react-redux'

import Slider from '../../components/slider/Slider'
import * as actionCreators from '../../redux/actions/index'

const Main = (props) => {
    return (
        <div>
            <Slider auth={ (authType) => props.onAuthChange(authType)}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthChange: (authType) => dispatch(actionCreators.switchAuthenticating(authType))
    }
}

export default connect(null, mapDispatchToProps)(Main)