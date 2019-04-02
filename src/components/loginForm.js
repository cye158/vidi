import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  validateProp = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };

  handleChange = ({ currentTarget, target }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProp(currentTarget);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    const account = { ...this.state.account };
    account[target.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const err = {};
    const { account } = this.state;

    if (account.username.trim() === "") err.username = "Username is required.";
    if (account.password.trim() === "") err.password = "Password is required.";

    return Object.keys(err).length === 0 ? null : err;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submit Success!");
  };

  render() {
    const { username, password } = this.state.account;
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
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
