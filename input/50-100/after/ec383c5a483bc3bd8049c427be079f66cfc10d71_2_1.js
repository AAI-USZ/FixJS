function(require, exports, module) {
  "use strict";

  var Collection = require('Collection');
  var utils = require('utils');

  function EntityCollection(context) {
    utils.extend(this, new Collection());
    //this._context = context;
  }

  EntityCollection.prototype.getContext = function (contextName) {
    return this._context[contextName];
  };

  EntityCollection.prototype.add = function () {
    var vegas = this.getContext('vegas');
  };

  return EntityCollection;

}