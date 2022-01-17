function (arg, caller__dirname) {

        if (!this.__testdirname && !caller__dirname) {
          throw new ProxyquireError(
            'Please call proxyquire.setup() from TOP LEVEL of your test file before using proxyquire.require!\n' +
            'Alternatively pass __dirname of test file as second argument proxyquire.require.'
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
            throw (err);
          } finally {
            // Make sure we remove the generated file even if require fails
            fs.unlinkSync(proxyquiredFile); 
          }

        return dependency;
      }