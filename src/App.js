import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import Category from './Category';
import Home1 from './Home1';
import Expenses from './Expenses';
import Login from './Login';
import Register from "./Register";

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Login}/>
                    <Route path='/register' exact={true} component={Register}/>
                    <Route path='/home' exact={true} component={Home1}/>
                    <Route path='/categories' exact={true} component={Category}/>
                    <Route path='/expenses' exact={true} component={Expenses}/>
                </Switch>
            </Router>
         );
    }
}
 
export default App;