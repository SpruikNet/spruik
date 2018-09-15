var isEmpty = require('./is-empty');
/**
 * trim empty object value
 * @param  {Object} obj
 * @return {Object}
 */
module.exports = function objectTrim(obj) {
  var tmp = {};
  for (var k in obj) {
    var v = obj[k];
    if (!isEmpty(v)) tmp[k] = v;
  }
  return tmp;
};
