import React from 'react';
import "./style.scss";

const Square = ({value, onClick}) => (
    <button className="square" onClick={onClick} >{value}</button>
);

export default Square