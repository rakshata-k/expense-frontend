import React, { Component } from 'react';
import {Nav,NavItem,NavbarBrand,Navbar,NavLink} from 'reactstrap';

class AppNav extends Component {
    state = {  }
    render() { 
        return ( 
        <div>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Expense tracker application</NavbarBrand> 
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/categories">Transactions</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/expenses">Add Expense</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">Log-out</NavLink>
                  </NavItem>
                </Nav>
            </Navbar>
          </div> );
    }
}
 
export default AppNav;