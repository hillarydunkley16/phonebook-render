// Update your Person component
import React from "react";
import { DeleteButton } from './Form'; 

const Person = (props) => {
  const { id, name, phoneNumber, onClick } = props;

  return (
    <>
      <li key={id}>
        {name} {phoneNumber}
      </li>
      <DeleteButton onClick={() => onClick(id)} />
    </>
  );
}

export default Person;
