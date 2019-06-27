import React from 'react';

import styles from './Scores.module.css';


function Scores(props) {
  const { value } = props;
  return <div className={styles.wrapper}>{value}</div>
}

export default Scores;