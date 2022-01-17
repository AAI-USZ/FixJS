function internalWatch(options) {
      if (typeof options !== 'object') return;

      if (options.onlogin && typeof options.onlogin !== 'function' ||
          options.onlogout && typeof options.onlogout !== 'function' ||
          options.onready && typeof options.onready !== 'function')
      {
        throw "non-function where function expected in parameters to navigator.id.watch()";
      }

      if (!options.onlogin) throw "'onlogin' is a required argument to navigator.id.watch()";
      if (!options.onlogout) throw "'onlogout' is a required argument to navigator.id.watch()";

      observers.login = options.onlogin || null;
      observers.logout = options.onlogout || null;
      observers.ready = options.onready || null;

      _open_hidden_iframe();

      // back compat support for loggedInEmail
      if (typeof options.loggedInEmail !== 'undefined' &&
          typeof options.loggedInUser !== 'undefined')
      {
        throw "you cannot supply *both* loggedInEmail and loggedInUser";
      }
      else if(typeof options.loggedInEmail !== 'undefined')
      {
        options.loggedInUser = options.loggedInEmail;
        delete options.loggedInEmail;
      }

      // check that the commChan was properly initialized before interacting with it.
      // on unsupported browsers commChan might still be undefined, in which case
      // we let the dialog display the "unsupported browser" message upon spawning.
      if (typeof options.loggedInUser !== 'undefined' && commChan) {
        commChan.notify({
          method: 'loggedInUser',
          params: options.loggedInUser
        });
      }
    }