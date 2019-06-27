import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import throttle from 'lodash.throttle';

import useInterval from '../../hooks/useInterval';
import boardData from '../../initState/board';
import delays from '../../initState/delays';

import Board from '../Board';
import Scores from '../Scores';

import {
  getNewCells,
  getNewSnake,
  getRandFood,
  getIsCollision,
  getIsNextSpeed,
  getNextState,
  getIsNeedNewFood,
} from './utils';




function Game() {
  const [cells, updateCells] = useState(boardData);
  const [snake, updateSnake] = useState([{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }]);
  const [food, updateFood] = useState(getRandFood(cells, snake));
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [delay, updateDelay] = useState(delays[0]);
  const [scores, updateScores] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', throttle(keyDownHandler, 100), false);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [])
  
  useEffect(() => {
    if (delay === null) {
      alert(`Your scores: ${scores}`);
      document.location.reload();
    }
  }, [delay])

  const moveTo = useCallback((arrow) => {
    const directions = {
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      down: { x: 0, y: 1 },
      up: { x: 0, y: -1 },  
    }
    const newDirection = directions[arrow];
    
    setDirection(direction => 
      Math.abs(direction.x) === Math.abs(newDirection.x) && Math.abs(direction.y) === Math.abs(newDirection.y)
      ? direction
      : newDirection
    );
  }, [direction])
  

  const keyDownHandler = ({ key }) => {

    if (key === 'ArrowRight') {
      moveTo('right');
    }
    if (key === 'ArrowLeft') {
      moveTo('left');
    }
    if (key === 'ArrowDown') {
      moveTo('down');
    }
    if (key === 'ArrowUp') {
      moveTo('up')
    }
  }
  


  useInterval(() => {
    const newSnake = getNewSnake({ snake, direction, cells, food: food[0] });
    const newFood = newSnake.length > snake.length ? getRandFood(cells, newSnake) : food;
    const newCells = getNewCells(newSnake, newFood);
    const isCollision = getIsCollision(newSnake);
    const isNextSpeed = getIsNextSpeed(newSnake);
    const isNeedNewFood = getIsNeedNewFood(snake, newSnake);

    if (isNeedNewFood) {
      updateFood(newFood);
      updateScores(scores => scores + 50)
      if (isNextSpeed) {
        updateDelay(getNextState(delays, delay));
      }
    }
    updateSnake(newSnake);
    updateCells(newCells);

    if (isCollision) {
      updateDelay(null);
      return;
    }
  }, delay)

  console.log('delay', delay)

  return (
    <>
      <Scores value={scores} />
      <Board data={cells}/>
    </>
    
  )
} 

export default Game;
