import React, { Component } from "react";
import Joi from "joi";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    console.log(Joi.validate(this.state.data, this.schema, options));
    if (!error) return null;

    const errors = {};
    for (let i of error.details) {
      errors[i.path[0]] = i.message;
    }
    return errors;
  };

  validateProp = ({ name, value }) => {
    const obj = { [name]: value };
    const subSchema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  };
}

export default Form;
