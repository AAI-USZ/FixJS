function find(file) {
          var jsfile;

          // finds foo.js even if it is required as foo
          if (fs.existsSync(file)) 
            return file;
          else {
            jsfile = file + '.js';
            if (fs.existsSync(jsfile))
              return jsfile;
          }

          // Cannot find file
          throw new ProxyquireError(
            util.format('Cannot find file you required.\nTried [%s] and [%s]', file, jsfile) +
            '\nIf you are running tests from different files asynchronously, pass in scripts __dirname instead of using ' +
            'proxyquire.setup().'
          );
        }