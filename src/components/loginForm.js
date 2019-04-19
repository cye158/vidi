import React from "react";
import Form from "./common/form";
import Joi from "joi";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
      .email(),
    password: Joi.string()
      .required()
      .label("Password")
  };

  handleChange = ({ currentTarget, target }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProp(currentTarget);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    const data = { ...this.state.data };
    data[target.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  doSubmit = () => {
    console.log("Submit Success!");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
