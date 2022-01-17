function(require, exports, module) {
  "use strict";

  var EntityCollection = require('EntityCollection');

  function ComponentCollection() {

  }

  ComponentCollection.prototype = new EntityCollection();

  ComponentCollection.prototype.hi = function () {
    console.log('hi');
  };

  return ComponentCollection;

}