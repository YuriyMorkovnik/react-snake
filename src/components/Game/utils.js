import { compose } from '../../utils';
import cells from '../../initState/board';


export const getFigureState = (figure, coord) => figure.map(({ x, y }) => ({ x: x + coord.x, y: y + coord.y }))


export const getNewCells = (newSnakeCoord, foods) => {
  
  const updateCellByFigure = (figure) => cells => {
    if (!figure) return cells
    
    return cells.map((row, index) => {
      const includedCoordsInRow = figure.filter(coord => coord.y === index);
      if (includedCoordsInRow.length > 0) {
        const newRow = row.map((cell, i) => { 
          return includedCoordsInRow.some(({ x }) => i === x) ? 1 : cell;
        });
        return newRow;
      }
      return row;
    })
  } 

  const newCells = compose(
    updateCellByFigure(newSnakeCoord),
    updateCellByFigure(foods)
  )(cells);

  return newCells;
}


const getNewHeadCoord = (head, direction, cells) => {
  const nextX = head.x + direction.x;
  const nextY = head.y + direction.y;
  const maxX = cells[head.y].length - 1;
  const maxY =  cells.length - 1;

  if (nextX < 0) {
    return { x: maxX, y: nextY }
  }
  if (nextX > maxX) {
    return { x: 0, y: nextY };
  }
  if (nextY < 0) {
    return { x: nextX, y: maxY };
  }
  if (nextY > maxY) {
    return { x: nextX, y: 0 };
  }
  return {x: nextX, y: nextY };
}

export const getNewSnake = ({ snake, direction, cells, food }) => {
  const [tail, ...body] = snake;
  const head = snake[snake.length - 1];

  const newHead = getNewHeadCoord(head, direction, cells);
  const newBody = food.x === newHead.x && food.y === newHead.y ? snake : body;
  const newSnake = [...newBody, newHead];
  return newSnake;
}

export const getIsCollision = (newSnake) => {
  const body = newSnake.slice(0, newSnake.length - 1);
  const { x: headX, y: headY } = newSnake[newSnake.length - 1];
  return body.some(({ x, y }) => x === headX && y === headY);
};

export const getIsNextSpeed = snake => snake.length % 5 === 0;

export const getIsNeedNewFood = (prevSnake, newSnake) => newSnake.length > prevSnake.length;

export const getNextState = (states, currentState) => {
  const currentIndex = states.indexOf(currentState);
  return states[currentIndex + 1] ? states[currentIndex + 1] : states[currentIndex];
}

export const getRandomElementFromArray = arr => arr[Math.round(Math.random() * (arr.length - 1))];

export const getRandFood = (cells, snake) => {
  const newFood = { x: Math.round(Math.random() * (cells[0].length - 1)), y: Math.round(Math.random() * (cells.length - 1)) };
  if (snake.some(({ x, y}) => x === newFood.x && y === newFood.y)) return getRandFood(cells, snake);
  return [newFood];
}
