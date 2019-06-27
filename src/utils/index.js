export const compose = (...functions) => value => functions.reduce((acc, func) => func(acc), value);

