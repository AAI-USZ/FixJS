function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');
  var utils = require('utils');

  function ComponentCollection(options) {
    utils.extend(this, new EntityCollection(options));
  }

  return ComponentCollection;

}