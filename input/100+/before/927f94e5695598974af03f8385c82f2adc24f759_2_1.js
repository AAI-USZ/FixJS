function(global) {
  "use strict";

  var vegas = global.vegas || {},
    util = vegas.util;

  function ObjectCollection() {
    util.extend(this, new vegas._Collection());
  };

  ObjectCollection.prototype.removeItem = function (itemToRemove) {
    var self = this;
    this.each(function (item, i) {
      if (item.getId() === itemToRemove.getId()) {
        debugger;
        self.remove(this); // fix lower level collections.
      }
    });
  };

  global.vegas._ObjectCollection = ObjectCollection;

}