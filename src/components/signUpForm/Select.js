import React from "react";

const Select = props => {
  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = "form-control control-error";
  }

  let renderOption = () => {
    if (props.name === "country") {
      return props.options.map((option, i) => (
        <option value={option.countryId} key={i}>
          {option.name}
        </option>
      ));
    }
  };

  return (
    <div className="form-group">
      <select
        className={formControl}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      >
        {renderOption()}
      </select>
    </div>
  );
};

export default Select;
