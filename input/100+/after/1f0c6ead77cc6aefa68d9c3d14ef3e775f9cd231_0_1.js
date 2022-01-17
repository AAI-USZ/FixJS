function(initCallback) {
    // Core libraries
    calipso.date = require('./Date').CalipsoDate;
    calipso.form = require('./Form').CalipsoForm;
    calipso.table = require('./Table').CalipsoTable;
    calipso.link = require('./Link').CalipsoLink;
    calipso.menu = require('./Menu');
    calipso.event = require('./Event');
    calipso.utils = require('./Utils');
    
    // Set app and config references
    calipso.app = require(path.join(rootpath, 'app')).app;
    calipso.config = require(path.join(rootpath, 'app')).app.set('config');

    // Configure the cache
    calipso.cache = require('./Cache').cache({ttl:calipso.config.cacheTtl});

    // Store our references and options
    calipso.initCallback = initCallback;

    // Create our calipso event emitter
    calipso.e = new calipso.event.CalipsoEventEmitter({
      hook:{
        name: 'calipso-hook',
        port: 9001,
        debug: false
      }
    });

    // Load configuration
    initialiseCalipso();

    // Return the function that manages the routing
    // Ok being non-synchro
    return function(req,res,next) {

      // Default menus and blocks for each request
      // More of these can be added in modules, these are jsut the defaults
      res.menu = {admin:new calipso.menu.CalipsoMenu('admin','weight'),
                  adminToolbar:new calipso.menu.CalipsoMenu('adminToolbar','weight'), // TODO - Configurable!
                  userToolbar:new calipso.menu.CalipsoMenu('userToolbar','weight'),
                  primary:new calipso.menu.CalipsoMenu('primary'),
                  secondary:new calipso.menu.CalipsoMenu('secondary')};


      // Initialise helpers;
      calipso.getDynamicHelpers(req, res);

      // Deal with any form content
      // This is due to node-formidable / connect / express
      // https://github.com/felixge/node-formidable/issues/30
      // Best to parse the form very early in the chain
      if(req.form) {

        calipso.form.process(req,function(form) {

          // Set the form data to the form object
          req.formData = form;

          // Route the modules
          eventRouteModules(req,res,next);

        });

      } else {
        // Route the modules
          eventRouteModules(req,res,next);
      }

    };
  }