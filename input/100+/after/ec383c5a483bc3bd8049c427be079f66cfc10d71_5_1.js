function(require, exports, module) {
  "use strict";

  var BaseVegas  = require('BaseVegas');

  // Gather up dependencies
  var ViewCollection  = require('ViewCollection');
  var RegionCollection  = require('RegionCollection');
  var ComponentCollection = require('ComponentCollection');
  var TabCollection = require('TabCollection');
  var View = require('View');

  // Create empty collections of entities, accessible only through their
  // respective methods below .views() .regions(), etc.
  var _views = new ViewCollection();
  var _regions = new RegionCollection();
  var _components = new ComponentCollection();
  var _tabs = new TabCollection();

  function Vegas(settings) {

    this.settings = settings;

    // Let the view know about the primary application
    var _context = {vegas: this};

    // Provides a way to create a new view given the current context.
    this.View = function ViewCreator(options) {
      return new View(options, _context);
    };

    // Creates a view given the above context
    var view = new this.View();

  }

  Vegas.prototype.views = function () {
    return _views;
  };

  Vegas.prototype.regions = function () {
    return _regions;
  };

  Vegas.prototype.components = function () {
    return _components;
  };

  Vegas.prototype.tabs = function () {
    return _tabs;
  };

  Vegas.prototype.tpl = function () {
    console.log('template function');
  };


  return Vegas;

}