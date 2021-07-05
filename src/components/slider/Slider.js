import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {connect} from 'react-redux'

import img1 from '../../sources/carousel1.jpg'
import img2 from '../../sources/carousel2.jpg'

import Auxiliary from '../../hoc/Auxiliary'

const Slider = (props) => {

    let text = <p style={{marginTop: '8vh'}}><strong onClick={ () => props.auth('sign up')} style={{cursor: 'pointer'}}>SIGN UP</strong> or <strong onClick={ () => props.auth('log in')} style={{cursor: 'pointer'}}>LOG IN</strong> to start adding</p>;

    if (props.user) text = <p style={{marginTop: '8vh', fontSize: '20px', letterSpacing: '2px'}}>Switch the page to <strong>'COURSES'</strong> to start</p>

    return (
        <Auxiliary>
            <Carousel style={{maxWidth: '1200px', width: '100%', margin: 'auto', padding: '0 20px'}}>
                <Carousel.Item>
                    <img
                        style={{height: '85vh', objectFit: 'cover'}}
                        className="d-block w-100" 
                        src={img1}
                        alt="main img1"/>
                    <Carousel.Caption style={{top: '35vh'}}>
                        <p style={{fontSize: '30px', letterSpacing: '1px'}}><strong>Main page of the site</strong></p>
                        <p style={{fontSize: '18px', letterSpacing: '4px'}}>Here you can find some courses and start learning for free</p>
                        {text}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img 
                        style={{height: '85vh', objectFit: 'cover'}}    
                        className="d-block w-100"
                        src={img2}
                        alt="main img2"/>
                    <Carousel.Caption style={{top: '35vh'}}>
                        <p style={{fontSize: '30px', letterSpacing: '1px'}}><strong>Main page of the site</strong></p>
                        <p style={{fontSize: '18px', letterSpacing: '4px'}}>Here you can find some courses and start learning for free</p>
                        {text}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Auxiliary>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.localId
    }
}

export default connect(mapStateToProps, null)(Slider)
