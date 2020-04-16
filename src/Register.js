import React, { Component } from "react";
import "./login-style.css";
import { Form, FormGroup, Label, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

class Register extends Component {
  state = {
    item: this.emptyItem,
    repass: "",
    open: false
  };

  emptyItem = {
    name: "",
    username: "",
    email: "",
    password: ""
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
    console.log(this.state.item);
  }

  handleChangePass(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      repass: value
    });
  }

  closeModal() {
    this.setState({ open: false });
  }

  async handleSubmit(event) {
    const item = this.state.item;

    if (this.state.item.password !== this.state.repass) {
      this.setState({
        open: true
      });
    } else {
      var data = await fetch(`api/users`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="background">
        <div>
          <Form className="register-form">
            <img
              className="login-container-scrum_icon"
              src={require("./img/expense.png")}
              alt="expense_image"
            />
            <p className="login-container-title">
              <center>Expense Tracker Application Registration</center>
            </p>
            <FormGroup>
              <Label className="register-label" for="name">
                Name:
              </Label>
              <input
                className="register-input-name"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <Label className="register-label" for="username">
                Userame:
              </Label>
              <input
                className="register-input-username"
                type="text"
                name="username"
                id="username"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <Label className="register-label" for="email">
                Email Id:
              </Label>
              <input
                className="register-input-email"
                type="text"
                name="email"
                id="email"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <Label className="register-label" for="password">
                Password:
              </Label>
              <input
                className="register-input-pass"
                type="password"
                name="password"
                id="password"
                onChange={this.handleChange}
              ></input>
            </FormGroup>

            <FormGroup>
              <Label className="register-label-repass">
                Confirm : <br />
                Password
              </Label>
              <input
                className="register-input-repass"
                type="password"
                name="pass"
                id="pass"
                onChange={this.handleChangePass}
              ></input>
            </FormGroup>

            <FormGroup>
              <Button
                className="register-button"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                <center>Register</center>
              </Button>
            </FormGroup>

            <Popup
              modal
              open={this.state.open}
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              <div className="login-container-popup">
                <a className="login-container-close" onClick={this.closeModal}>
                  &times;
                </a>
                The passwords do not match! <br />
                Please try again.
              </div>
            </Popup>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
