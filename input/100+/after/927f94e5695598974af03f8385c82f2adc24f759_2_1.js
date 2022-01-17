function(global) {
  "use strict";

  var vegas = global.vegas || {}, // Get the application object
    util = vegas.util; // utility methods

  /**
   * @class ObjectCollection
   * @memberOf vegas
   * @extends vegas._Collection
   * @description A generic array like object that is used for keeping track of
   * a collection of objects, provides utility methods working with the
   * collections.
   */
  function ObjectCollection() {
    util.extend(this, new vegas._Collection());
  };

  ObjectCollection.prototype.removeItem = function (itemToRemove) {
    var self = this;
    this.each(function (item, i) {
      if (item.getId() === itemToRemove.getId()) {
        self.remove(itemToRemove); // fix lower level collections.
      }
    });
  };

  global.vegas._ObjectCollection = ObjectCollection;

}