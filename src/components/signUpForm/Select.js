import React from "react";

const Select = props => {
  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = "form-control control-error";
  }

  let renderOption = () => {
    console.log("the props value", props);
    return props.options.map((option, i) => (
      <option value={option} key={i}>
        {option}
      </option>
    ));
  };

  return (
    <div className="form-group">
      <select
        placeholder={props.placeholder}
        className={formControl}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      >
        <option key="-1">{props.placeholder}</option>
        {renderOption()}
      </select>
    </div>
  );
};

export default Select;
