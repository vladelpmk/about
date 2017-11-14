import React from 'react';

export const MenuItem = (props) => {
  return (
    <li className="">
      <a>
        {props.children}
      </a>
    </li>
  )
}
