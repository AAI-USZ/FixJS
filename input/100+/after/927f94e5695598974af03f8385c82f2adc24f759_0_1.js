function(global) {
  "use strict";

  var vegas = global.vegas || {},
    util = vegas.util;

  /**
   * @class _Collection
   * @memberOf vegas
   * @extends vegas._Base
   * @description Acts much like an array and is used as a base class of
   * ObjectCollections
   */
  function Collection() {

    util.extend(this, new vegas._Base());
    this.length = 0;

    // Use common array methods
    this.pop = Array.prototype.pop;
    this.push = Array.prototype.push;
    this.reverse = Array.prototype.reverse;
    this.shift = Array.prototype.shift;
    this.sort = Array.prototype.sort;
    this.splice = Array.prototype.splice;
    this.unshift = Array.prototype.unshift;
    this.concat = Array.prototype.concat;
    this.join = Array.prototype.join;
    this.slice = Array.prototype.slice;

  };

  Collection.prototype.each = function (iterator, context) {
    var obj = this;
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === {}) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === {}) return;
        }
      }
    }
  };

  Collection.prototype.addToPosition = function (items, position) {

    // Can't use position || this.length; because of falsy values will cause it to mix up e.g. 0
    position = (position === undefined) ? this.length : position;

    // if a non-array/collection item was passed in, throw it in an array to make things consistent
    if (Object.prototype.toString.call(items) !== '[object Array]' && !(items instanceof Collection)) {
      items = [items];
    }

    var item;

    for (var i = 0; i < items.length; i++) {
      item = items[i];
      // add the new item to the specified position
      var res = this.splice(position + i, 0, item);
    }

  };

  Collection.prototype.add = function (items) {

    // If there is more than one argument, put each argument into the items
    // array
    if (arguments.length > 1) {
      items = [];
      for (var i = 0; i < arguments.length; i++) {
        items.push(arguments[i]);
      }
    }
    // if a non-array/collection item was passed in to the first argument,
    // throw it in an array
    else if (Object.prototype.toString.call(items) !== '[object Array]' && !(items instanceof Collection)) {
      items = [items];
    }

    var item;

    for (var i = 0; i < items.length; i++) {
      item = items[i];
      this.push(items[i]);
    }

  };

  Collection.prototype.remove = function (items) {
    var itemPosition,
        item;

    var self = this;

    // If there is more than one argument, put each argument into the items
    // array
    if (arguments.length > 1) {
      items = [];
      for (var i = 0; i < arguments.length; i++) {
        items.push(arguments[i]);
      }
    }
    // if a non-array/collection item was passed in to the first argument,
    // throw it in an array
    else if (Object.prototype.toString.call(items) !== '[object Array]' && !(items instanceof Collection)) {
      items = [items];
    }

    for (var i = 0; i < items.length; i++) {
      item = items[i];

      itemPosition = Collection.prototype.getPosition.call(this, item);

      if (itemPosition !== false) {
        self.splice(itemPosition, 1);
      }
      else {
        return false;
      }
    }

    return true;
  };

  Collection.prototype.getPosition = function (item) {

    var len = this.length;

    for (var i = 0; i < len; i++) {
      if (this[i] === item){
        return i;
      }
    }

    return false;
  };

  Collection.prototype.toString = function () {

    var len = this.length;

    var string = '';
    for (var i = 0; i < len; i++) {
      string += this[i].toString() + "\n";
    }

    return string;
  };

  Collection.prototype.eq = function (pos) {
    return this[pos];
  };

  global.vegas._Collection = Collection;

}