function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function RegionCollection(options) {
    utils.extend(this, new EntityCollection(options));
  }

  return RegionCollection;

}