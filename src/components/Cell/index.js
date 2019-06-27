import React from 'react';

import styles from './Cell.module.css';


function Cell(props) {
  const { value } = props;
  return <div className={`${styles.wrapper} ${value ? styles.active : ''}`}></div>
}

export default Cell;
