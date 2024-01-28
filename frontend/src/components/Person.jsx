// Update your Person component
import React from "react";
import { DeleteButton } from './Form'; 

const Person = (props) => {
  const { id, name, number, onClick } = props;

  return (
    <>
      <li key={id}>
        {name} {number}
      </li>
      <DeleteButton onClick={() => onClick(id)} />
    </>
  );
}

export default Person;
