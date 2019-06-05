import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .label("Username")
      .email()
      .required(),
    password: Joi.string()
      .label("Password")
      .min(5)
      .required(),
    name: Joi.string()
      .label("Name")
      .required()
  };

  doSubmit = async () => {
    try {
      const { data: user } = this.state;
      const response = await register(user);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
      console.log("Register Success");
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
