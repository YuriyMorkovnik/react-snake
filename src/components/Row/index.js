import React from 'react';

import Cell from '../Cell';

import styles from './Row.module.css';


function Row(props) {
  const { data } = props;
  return (
    <div className={styles.wrapper}>
      {data.map((cell, i) => <Cell value={cell} key={`${i}${cell}`} />)}
    </div>
  )
}

export default Row;
