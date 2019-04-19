import React from "react";
import Form from "./common/form";
import Joi from "joi";

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
    console.log("Register Success");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} />
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </div>
    );
  }
}

export default RegisterForm;
