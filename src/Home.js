import React, { Component } from 'react';
import AppNav from './AppNav';
import "./login-style.css";

class Home extends Component {
    state = {  }
    componentDidMount(){
        console.log(localStorage.getItem('username'))
    }
    render() { 
        return ( 
        <div>
            <AppNav/>
           <h2 className="home">
                <center>Welcome to easy expense app !!</center>
            </h2> 
        </div>
        );
    }
}
 
export default Home;