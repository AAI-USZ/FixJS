function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function TabCollection(options) {
    utils.extend(this, new EntityCollection(options));
  }

  return TabCollection;

}