function(require, exports, module) {
  "use strict";

  var utils = require('utils');

  function Entity(name, options) {

    this.setName(name);

    this.setContextInfo(this.getSingularName(), options);

    this.setId();

    this.settings('collection', this.getPluralName());

    this.collection().add(this);

  }

  /**
   * Get a nifty looking unique identifier
   */
  Entity.prototype.setId = function () {
    this._id = utils.generateId();
  };

  /**
   * Retrieve the entities ID
   */
  Entity.prototype.getId = function () {
    return this._id;
  };

  /**
   * Retrieve the entities element
   */
  Entity.prototype.getElement = function () {
    return jQuery(document.getElementById(this.getId()));
  };

  Entity.prototype.getObjectFromElement = function (element) {
    element = jQuery(element);

    var elementId = element.attr('id')

    var foundCollectionObject = false;
    this.collection().each(function (collectionObject) {
      if (collectionObject.getId() == elementId) {
        foundCollectionObject = collectionObject;
      }
    });

    return foundCollectionObject;

  };

  Entity.prototype.getFromAnElement = function (element) {
    element = jQuery(element);
    var found = false;
    while (!found) {
      if (element && element.is('.' + this.getSingularName())) {
         found = true;
      }
      else if (element.is('body')) {
        return false;
      }
      else {
        element = element.parent();
      }

    }
    return element;

  };

  Entity.prototype.useSettings  = function (defaultSettings, options) {
    this._settings = utils.extend(defaultSettings, options);
  };

  Entity.prototype.settings = function (setting, settingValue) {
    this._settings = this._settings || {};
    if (settingValue !== undefined) {
      this._settings[setting] = settingValue;
    }
    else {
      return this._settings[setting];
    }
  };

  Entity.prototype.set = function (settingName, setting) {
    this._settings[settingName] = setting;
  };

  Entity.prototype.setContextInfo = function (contextName, options) {

    options = options || {};
    var context = options.context || {};

    // Use the passed in context
    this._useContext(context);

    // Add the entity context
    this._setContext(contextName, this, true);
  };

  /**
   * Let the entity know about its context / anscestry, for example, a tab should
   * know about its component, a component should know about its region, a region
   * should know about its view, a view should know about its window, etc.
   */
  Entity.prototype._setContext = function (contextName, contextValue, isCurrentEntityContext) {

    this._context = this._context || {};
    this._context[contextName] = contextValue;

    if (isCurrentEntityContext) {
      this._currentContext = contextValue;
      this.setEntityName(contextName);
    }

    this._createContextGetter(contextName);

  };

  Entity.prototype._createContextGetter = function (contextName) {
    // Provide a getter on the entity for each context that has been set
    // .getWindow(), .getView(), .getComponent(), .getTab(), etc
    this['get' + utils.capitalize(contextName)] = function () {
      return this.getContext(contextName);
    };
  };

  Entity.prototype._useContext = function (context) {
    var contextName;
    for (contextName in context) {
      this._createContextGetter(contextName);
    }
    this._context = context || {};
  };

  Entity.prototype.getEntityName = function () {
    return this._entityName;
  };

  Entity.prototype.setEntityName = function (entityName) {
    this._entityName = entityName
  };

  Entity.prototype.getContext = function (contextName) {
    var context = this._context;

    if (contextName === undefined) {
      return this._context;
    }

    // A context item was provided and we have context
    if (typeof(context) == 'object' && contextName !== undefined) {

      // We found the context item in the context
      if (contextName in context) {
        return context[contextName];
      }
      // No context for this item was find
      else {
        return false;
      }

    }
    // context item was defined but we have no context
    else if (contextName !== undefined) {
      return false;
    }
    else {
      console.log('no context provided to object');
      return false;
    }

    console.warn('uncaught logic');

  };

  /**
   * The collection the entity belongs to
   */
  Entity.prototype.collection = function () {
    var vegas = this.getContext('vegas');
    var collectionName = utils.pluralize(this.getName()).toLowerCase();

    if (collectionName in vegas && typeof(vegas[collectionName]) == 'function') {
      return vegas[collectionName]();
    }
    else {
      console.error('Could not get collection for' + this.entityName);
      return false;
    }
  };

  Entity.prototype.getSingularName = function () {
    return this.getName().toLowerCase();
  };

  Entity.prototype.getPluralName = function () {
    return utils.pluralize(this.getSingularName(), 2);
  };

  Entity.prototype.setName = function (name) {
    this._name = name;
  };

  Entity.prototype.getName = function () {
    return  this._name || false;
  }

  Entity.prototype.trigger = function (event) {
    this._on = this._on || {};

    if (!this._on[event]) {
      this._on[event] = [];
    }

    this._on[event].forEach(function (hook) {
      hook.call(this, this);
    });
  };

  Entity.prototype.on = function (event, callback) {
    this._on = this._on || {};

    if (!this._on[event]) {
      this._on[event] = [];
      this._on[event].push(callback);
    }
    else {
      this._on[event].push(callback);
      this.trigger(event);
    }

  };

  return Entity;

}