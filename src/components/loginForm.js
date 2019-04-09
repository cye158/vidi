import React from "react";
import Form from "./common/form";
import Input from "./common/input";
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
      .label("Username"),
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
    const { username, password } = this.state.data;
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={username}
            onChange={this.handleChange}
            name="username"
            label="Username"
            error={errors.username}
          />
          <Input
            value={password}
            onChange={this.handleChange}
            name="password"
            label="Password"
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
