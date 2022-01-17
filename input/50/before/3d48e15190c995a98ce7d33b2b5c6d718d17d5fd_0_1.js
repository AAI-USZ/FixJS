function() {
  var exports, pork;

  pork = require('./pork');

  exports = module.exports = pork.create;

  exports.create = pork.create;

  exports.pork = pork;

}