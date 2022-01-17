function(){
    
    // Real array of arguments
    var args = Array.prototype.slice.call(arguments, 0),
    
    // Object to be returned by builder
    object = {},
    
    prototype = defaultPrototype;
            
    //////////////////////////////////////////////////////////////////////////
    //
    //  Define object prototype
    //

    // Inherit object prototype
    if (typeof args[0] === "object" && util.isAgility(args[0])) {
      prototype = args[0];    
      args.shift(); // remaining args now work as though object wasn't specified
    } // build from agility object
    
    // Build object from prototype as well as the individual prototype parts
    // This enables differential inheritance at the sub-object level, e.g. object.view.format
    object = Object.create(prototype);
    object.model = Object.create(prototype.model);
    object.view = Object.create(prototype.view);
    object.controller = Object.create(prototype.controller);
    object._container = Object.create(prototype._container);
    object._events = Object.create(prototype._events);

    // Fresh 'own' properties (i.e. properties that are not inherited at all)
    object._id = idCounter++;
    object._events.data = {}; // event bindings will happen below
    object._container.children = {};
    object.view.$root = $(); // empty jQuery object

    // Cloned own properties (i.e. properties that are inherited by direct copy instead of by prototype chain)
    // This prevents children from altering parents models
    object.model._data = prototype.model._data ? $.extend(true, {}, prototype.model._data) : {};
    object._data = prototype._data ? $.extend(true, {}, prototype._data) : {};

    //////////////////////////////////////////////////////////////////////////
    //
    //  Extend model, view, controller
    //

    // Just the default prototype
    if (args.length === 0) {
    }
  
    // Prototype differential from single {model,view,controller} object
    else if (args.length === 1 && typeof args[0] === 'object' && (args[0].model || args[0].view || args[0].controller) ) {
      for (var prop in args[0]) {
        if (prop === 'model') {
          $.extend(object.model._data, args[0].model);
        }
        else if (prop === 'view') {
          $.extend(object.view, args[0].view);
        }
        else if (prop === 'controller') {
          $.extend(object.controller, args[0].controller);
          util.extendController(object);
        }
        // User-defined methods
        else {
          object[prop] = args[0][prop];
        }
      }
    } // {model, view, controller} arg
    
    // Prototype differential from separate {model}, {view}, {controller} arguments
    else {
      
      // Model from string
      if (typeof args[0] === 'object') {
        $.extend(object.model._data, args[0]);
      }
      else if (args[0]) {
        throw "agility.js: unknown argument type (model)";
      }

      // View format from shorthand string (..., '<div>whatever</div>', ...)
      if (typeof args[1] === 'string') {
        object.view.format = args[1]; // extend view with .format
      }  
      // View from object (..., {format:'<div>whatever</div>'}, ...)
      else if (typeof args[1] === 'object') {
        $.extend(object.view, args[1]);
      }      
      else if (args[1]) {
        throw "agility.js: unknown argument type (view)";
      }
      
      // View style from shorthand string (..., ..., 'p {color:red}', ...)
      if (typeof args[2] === 'string') {
        object.view.style = args[2];
        args.splice(2, 1); // so that controller code below works
      }
      
      // Controller from object (..., ..., {method:function(){}})
      if (typeof args[2] === 'object') {
        $.extend(object.controller, args[2]);
        util.extendController(object);
      }
      else if (args[2]) {
        throw "agility.js: unknown argument type (controller)";
      }
      
    } // ({model}, {view}, {controller}) args
    
    //////////////////////////////////////////////////////////////////////////
    //
    //  Bootstrap: Bindings, initializations, etc
    //
    
    // Save model's initial state (so it can be .reset() later)
    object.model._initData = $.extend({}, object.model._data);

    // object.* will have their 'this' === object. This should come before call to object.* below.
    util.proxyAll(object, object);

    // Initialize $root, needed for DOM events binding below
    object.view.render();
  
    // Bind all controllers to their events
    for (var ev in object.controller) {
      if (typeof object.controller[ev] === 'function') {
        object.bind(ev, object.controller[ev]);
      }
    }  
  
    // Auto-triggers create event
    object.trigger('create');    
    
    return object;
    
  }