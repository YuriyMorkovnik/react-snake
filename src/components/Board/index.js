import React from 'react';

import Row from '../Row';

import styles from './Board.module.css';


function Board(props) {
  const { data } = props;
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {data.map((row, i) => <Row data={row} key={`${i}${row[0]}`}/>)}
      </div>
     
    </div>
  )
}

export default Board;
