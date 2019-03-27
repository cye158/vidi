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

  validate = () => {
    console.log("Validating");
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.target.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    console.log("submitted");
  };

  render() {
    const { username, password } = this.state.account;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            value={username}
            onChange={this.handleChange}
            name="username"
            label="Username"
          />
          <Input
            value={password}
            onChange={this.handleChange}
            name="password"
            label="Password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
