function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function ViewCollection() {

  }

  ViewCollection.prototype = new EntityCollection();

  ViewCollection.prototype.hi = function () {
    console.log('hi');
  };

  return ViewCollection;

}