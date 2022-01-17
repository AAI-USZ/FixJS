function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function RegionCollection() {

  }

  RegionCollection.prototype = new EntityCollection();

  RegionCollection.prototype.hi = function () {
    console.log('hi');
  };

  return RegionCollection;

}