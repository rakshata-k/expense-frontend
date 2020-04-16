import React, { Component } from "react";
import "./login-style.css";
import { Form, FormGroup, Label, Button } from "reactstrap";
import Popup from "reactjs-popup";
import Category from './Category';

class Login extends Component {
  state = {
      username : "",
      password : "",
      title : "Expense Tracker App Login",
      open: false,
      loginValid: false
  };

  constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event){
    const target = event.target; 
    const value = target.value;
    const name = target.name;

    if(name === "username"){
        this.setState({
            username : value
        })
    }
    else{
        this.setState({
            password : value
        })
    }
  }

  async handleSubmit(){
      const response = await fetch(`/api/users/${this.state.username}`)
      .then(function(resp) {
          if (!resp.ok) {
              throw Error(resp.statusText);
          }
         return resp;
      }).catch(function(error) {
      });
      if(response !== undefined){
      const body = await response.json();
      if(this.state.password !== body.password){
        console.log("hello")
         this.setState({
           open: true
        });
      }
    else{
      this.setState({
        open: true,
        loginValid: true
      })
      console.log('boobs me hu, ')
      localStorage.setItem('username', this.state.username)
      this.props.history.push('/home')
    }
  }
  }

  closeModal() {
    this.setState({ open: false });
  }

  render() {

    return (
      <div className="background">

        <div>
          <Form className="login-container">
          <img className="login-container-scrum_icon" src={require("./img/expense.png")} alt="expense_image"/>
            <p className="login-container-title"><center>{this.state.title}</center></p>
            <FormGroup>
              <img className="login-container-user_icon" src={require("./img/user.png")} alt="user_image"/>
                <Label className="login-container-label" for="username">Username</Label>
                <br />
                <center>
                    <input className="login-container-input"
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                    />
                </center>
            </FormGroup>
            <br/>
            <FormGroup>
            <img className="login-container-user_icon" src={require("./img/password.png")} alt="password_image"/>
                <Label className="login-container-label" for="password">Password</Label>
                <br />
                <center>
                    <input className="login-container-input"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    />
                </center>
            </FormGroup>

            <FormGroup>
              <center>
                <br />
                   <Button className="login-container-button" 
                    onClick={()=>{this.handleSubmit()}}> Login</Button>
              </center>
            </FormGroup>

            <Popup modal open={this.state.open} 
              closeOnDocumentClick
              onClose={this.closeModal}> 
              <div className="login-container-popup">
                <a className="login-container-close" onClick={this.closeModal}>&times;</a>
                The username or password is incorrect! <br/>Please try again.
              </div>
            </Popup>

          </Form>
        </div>
      </div>
    );
  }
}

export default Login;