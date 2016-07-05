module.exports = function(value){
  if (typeof value === 'string' || value instanceof String) return true;
  return false;
}