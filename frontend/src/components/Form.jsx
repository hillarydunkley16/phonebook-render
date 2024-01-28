// Form.js

import React from "react";

export const DeleteButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      DELETE
    </button>
  );
};

export const Input = (props) => {
  return (
    <p>
      {props.text}
      <input
        value={props.value}
        onChange={props.onChange}
      />
    </p>
  );
};

export const Button = (props) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addName}>
        <Input text='Name: ' value={props.newName} onChange={props.handleNameChange} />
        <Input text='Number: ' value={props.newNumber} onChange={props.handleNumChange} />
        <Button type='submit' text={props.buttonText} />
      </form>
    </>
  );
};

  