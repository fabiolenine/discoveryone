module.exports = function(value){
  const isEmpty = require('./isEmpty.js')(value);
  const isString = require('./isString.js')(value);

  if(isEmpty) return false;
  if(!isString) return false;

  return (value.length > 3);
}