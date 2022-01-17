function proxyquireApi () {

  function clearRequireCache() {
    Object.keys(require.cache).forEach(function (key) {
      if (key !==  __filename)
        delete require.cache[key];
    });
  }

  function addOverrides(mdl, name) {

    // Store it under the given name
    if (!config[name]) {

      // configure entire module if it was not configured before
      config[name] = mdl;

    } else {

      // otherwise just reconfigure it by adding/overriding given properties
      Object.keys(mdl).forEach(function (key) {
        config[name][key] = mdl[key];
      });

    }
  }

  function removeProperty (mdl, prop) {
    if (config[mdl].__proxyquire && config[mdl].__proxyquire.strict) {
      delete config[mdl][prop];
    } else {
      
      // replace overridden property with the original one from the real module 
      if (config[mdl].__proxyquire && config[mdl].__proxyquire.original) { 

        if (!config[mdl].__proxyquire.original[prop]) {
          throw new ProxyquireError(
            'The property [' + prop + '] you are trying to remove does not exist on the original module!' + 
            ' What are you up to?'
          );
        }

        config[mdl][prop] = config[mdl].__proxyquire.original[prop];

      } else {
        throw new ProxyquireError(
          'Did not find original module when trying to replace stubbed property with original one.' +
          '\nPlease make sure to cause the module to be required before removing properties.'
        );
      }
    }
  }

  return {
      reset: function () { 
        config = { };
        clearRequireCache();
        active = true;
        return this;
      }
    , setup: function () { 
        // Needs to be called at root of test file, so we can resolve its __dirname
        // Ideally this is done like so: var proxyquire = require('proxyquire').setup();
      
        var callerArgs = arguments.callee.caller.arguments
        ,  caller__dirname = callerArgs[4];
        
        if (!caller__dirname) {
          throw new ProxyquireError('Please call proxyquire.setup only from the TOP LEVEL of your test file!');
        }

        this.__testdirname = caller__dirname;
        return this;
      }
    , add: function (arg) {
        Object.keys(arg).forEach(function (key) {
          addOverrides(arg[key], key); 
        });

        active = true;
        return this;
      }
    , del: function (arg) {

        // Remove entire module
        if (typeof arg === 'string') {
          // Cannot delete module property here, since dependant holds reference to it and thus wouldn't be affected
          // Instead we need to remove all props to get them to point at the real required module

          Object.keys(config[arg]).forEach( function (p) {
            if (p !== '__proxyquire') removeProperty(arg, p);
          });

          return this;
        }

        // Remove only specified properties of the given module
        Object.keys(arg).forEach( function (mdl) {

          if (config[mdl]) {
            var prop = arg[mdl];

            if (typeof prop === 'string') {

              removeProperty(mdl, prop);

            } else if (Array.isArray(prop)) {

              prop.forEach(function (p) {
                removeProperty(mdl, p);
              });

            } else {
              throw new ProxyquireError('argument to delete needs to be key: String, or key: Array[String] object');
            }
          }
          
        });

        return this;
      }
    , require: function (arg, caller__dirname) {

        if (!this.__testdirname && !caller__dirname) {
          throw new ProxyquireError(
            'Please call proxyquire.setup() from TOP LEVEL of your test file before using proxyquire.require!\n' +
            'Alternatively pass __dirname of test file as second argument to proxyquire.require.'
          );
        }

        // Automatically injects require override into code of the file to be required.
        // Saves result as new file and requires that file instead of the original one.
        // That way no change to original code is necessary in order to hook into proxyquire.
      
        function find(file) {
          var jsfile;

          // finds foo.js even if it is required as foo
          if (existsSync(file)) 
            return file;
          else {
            jsfile = file + '.js';
            if (existsSync(jsfile))
              return jsfile;
          }

          // Cannot find file
          throw new ProxyquireError(
            util.format('Cannot find file you required.\nTried [%s] and [%s]', file, jsfile) +
            '\nIf you are running tests from different files asynchronously, pass in scripts __dirname instead of using ' +
            'proxyquire.setup().'
          );
        }

        var originalFile    =  find(resolve(arg, caller__dirname || this.__testdirname))
          , originalCode    =  fs.readFileSync(originalFile)
          , proxyquiredFile =  originalFile + '.proxyquirefied'
          , proxyquiredCode =  
              // all on first line (don't introduce new line in order to keep original and proxified line numbers matching)
              '/* START proxyquirefying (This file should have been removed after testing, please remove!) */'  +
              'var require = require("' + this._proxyquire + '"); '                                             +
              '/* END proxyquirefying Original code on this line: */ '                                          +
              originalCode
          , dependency
          ;
          
          fs.writeFileSync(proxyquiredFile, proxyquiredCode);

          try {
            dependency = require(proxyquiredFile);
          } catch (err) {
            console.trace();
            console.error(err);
            throw (err);
          } finally {
            // Make sure we remove the generated file even if require fails
            fs.unlinkSync(proxyquiredFile); 
          }

        return dependency;
      }

    // Don't touch below props as they are only here for diagnostics and testing
    , _config: config
    , _proxyquire: 'proxyquire'
  };
}