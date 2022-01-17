function(require, exports, module) {
  "use strict";

  function EntityCollection() {

  }

  EntityCollection.prototype.sup = function () {
    console.log('sup');
  };

  return EntityCollection;

}