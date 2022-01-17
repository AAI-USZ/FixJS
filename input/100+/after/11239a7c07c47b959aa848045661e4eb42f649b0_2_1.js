function (name, definition) {
  if ((typeof name === "function" || typeof name === 'object') && !definition) {
    definition = name;
    name = definition.name;
  }

  if (name) {
    name = common.capitalize(name);
  }
  else {
    // Use the next available resource name
    for (var i = 0; !name || (name in resourceful.resources); i++) {
      name = 'Resource' + i;
    }
  }

  var Factory = function Factory (attrs) {
    var self = this;

    resourceful.Resource.call(this);

    Object.defineProperty(this, '_properties', {
      value: {},
      enumerable: false
    });

    Object.keys(Factory.properties).forEach(function (k) {
      self._properties[k] = Factory.properties[k]['default'];
    });

    this._properties.resource = name;

    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        self._properties[k] = attrs[k];
      });
    }

    Object.keys(this._properties).forEach(function (k) {
      resourceful.defineProperty(self, k, Factory.schema.properties[k]);
    });
  };

  //
  // Setup inheritance
  //
  Factory.__proto__ = resourceful.Resource;
  Factory.prototype.__proto__ = resourceful.Resource.prototype;

  //
  // Setup intelligent defaults for various properties
  // in the Resource Factory.
  //
  Factory.resource  = name;
  Factory.lowerResource = common.lowerize(name);

  Factory.key       = '_id';
  Factory.views     = {};
  Factory._children = [];
  Factory._parents  = [];

  Factory.schema = {
    name: name,
    properties: {
      _id: { type: 'string', unique: true }
    },
    links: []
  };

  Factory.hooks = {
    before: {},
    after:  {}
  };

  ['get', 'save', 'update', 'create', 'destroy'].forEach(function (m) {
    Factory.hooks.before[m] = [];
    Factory.hooks.after[m]  = [];
  });

  Factory.emitter = new events.EventEmitter();

  Object.keys(events.EventEmitter.prototype).forEach(function (k) {
    Factory[k] = function () {
      return Factory.emitter[k].apply(Factory.emitter, arguments);
    };
  });

  Factory.on('error', function () {
    //
    // TODO: Logging
    //
  });

  if (typeof definition === 'object') {
    // Use definition as schema
    Factory.define(definition);
  } else {
    (definition || function () {}).call(Factory);
  }

  Factory.init();

  // Add this resource to the set of resources resourceful knows about
  resourceful.register(name, Factory);

  return Factory;
}