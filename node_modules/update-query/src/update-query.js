var qs = require('query-string'),
  assign = require('object-assign'),
  objectTrim = require('./utils/object-trim');

/**
 * update query string with an object
 * @param  {String} url
 * @param  {Object} obj
 * @return {String} url with new query string
 */
module.exports = function updateQuery(url, obj) {
  var _url = url.split('?'),
    path = _url[0],
    curQs = _url[1];

  var newQs = qs.stringify(
    objectTrim(assign(qs.parse(curQs), obj)),
    { encode: false }
  );
  return newQs ? path + '?' + newQs : path;
};
