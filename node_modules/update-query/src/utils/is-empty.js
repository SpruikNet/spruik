/**
 * detect falsey values except 0
 * @param  {Any} entity
 * @return {Boolean}
 */
module.exports = function isEmpty(entity) {
  return entity === 0 ? 0 : !entity;
};
