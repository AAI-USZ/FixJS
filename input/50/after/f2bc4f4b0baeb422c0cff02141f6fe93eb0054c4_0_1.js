function () { 
      // Needs to be called at root of test file, so we can resolve its __dirname
      // Ideally this is done like so: var proxyquire = require('proxyquire').setup();
    
      var callerArgs = arguments.callee.caller.arguments
      ,  caller__dirname = callerArgs[4];
      
      if (!caller__dirname) {
        throw new ProxyquireError('Please call proxyquire.setup only from the TOP LEVEL of your test file!');
      }

      testdirname = caller__dirname;
      return this;
  }