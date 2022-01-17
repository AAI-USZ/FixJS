function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');
  var utils = require('utils');

  function ViewCollection(context) {
    utils.extend(this, new EntityCollection(context));
  }

  return ViewCollection;

}