import React, { Component } from "react";
import Joi from "joi";
import Input from "./input";
import Select from "./select";

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

  handleChange = ({ currentTarget, target }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProp(currentTarget);
    if (errorMessage) errors[target.name] = errorMessage;
    else delete errors[target.name];

    const data = { ...this.state.data };
    data[target.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text", step) => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        value={data[name]}
        step={step}
        onChange={this.handleChange}
        name={name}
        label={label}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        options={options}
        value={data[name]}
        onChange={this.handleChange}
        label={label}
        error={errors[name]}
      />
    );
  };
}

export default Form;
