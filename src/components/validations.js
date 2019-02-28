import React from "react";

const checkValidations = (fieldName, checkCondition) => {
  if (checkCondition && checkCondition.isInvalidEmail) {
    return <span>Enter a valid {fieldName}</span>;
  }
  if (checkCondition && checkCondition.isInvalidPhoneNo) {
    return <span>{fieldName} should be greater then 10 numbers</span>;
  }
  return <span>{fieldName} is required</span>;
};

export default checkValidations;
