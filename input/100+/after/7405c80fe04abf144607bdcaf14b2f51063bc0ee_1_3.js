function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (options && options.parse) attributes = this.parse(attributes);
    if (defaults = getValue(this, 'defaults')) {
      attributes = _.extend({}, defaults, attributes);
    }
    if (options && options.collection) this.collection = options.collection;
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    if (!this.set(attributes, {silent: true})) {
      throw new Error("Can't create an invalid model");
    }
    delete this._changed;
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  }