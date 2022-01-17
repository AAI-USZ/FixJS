function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function TabCollection() {

  }

  TabCollection.prototype = new EntityCollection();

  TabCollection.prototype.hi = function () {
    console.log('hi');
  };

  return TabCollection;

}