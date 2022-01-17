function _initGlobalBrackets() {
        // Define core brackets namespace if it isn't already defined
        //
        // We can't simply do 'brackets = {}' to define it in the global namespace because
        // we're in "use strict" mode. Most likely, 'window' will always point to the global
        // object when this code is running. However, in case it isn't (e.g. if we're running 
        // inside Node for CI testing) we use this trick to get the global object.
        //
        // Taken from:
        //   http://stackoverflow.com/questions/3277182/how-to-get-the-global-object-in-javascript
        var Fn = Function, global = (new Fn('return this'))();
        if (!global.brackets) {
            global.brackets = {};
        }
        
        // Uncomment the following line to force all low level file i/o routines to complete
        // asynchronously. This should only be done for testing/debugging.
        // NOTE: Make sure this line is commented out again before committing!
        //brackets.forceAsyncCallbacks = true;
    
        // Load native shell when brackets is run in a native shell rather than the browser
        // TODO: (issue #266) load conditionally
        brackets.shellAPI = require("utils/ShellAPI");
        
        brackets.inBrowser = !brackets.hasOwnProperty("fs");
        
        brackets.platform = (global.navigator.platform === "MacIntel" || global.navigator.platform === "MacPPC") ? "mac" : "win";
        
        // Loading extensions requires creating new require.js contexts, which requires access to the global 'require' object
        // that always gets hidden by the 'require' in the AMD wrapper. We store this in the brackets object here so that 
        // the ExtensionLoader doesn't have to have access to the global object.
        brackets.libRequire = global.require;

        // Also store our current require.js context (the one that loads brackets core modules) so that extensions can use it
        // Note: we change the name to "getModule" because this won't do exactly the same thing as 'require' in AMD-wrapped
        // modules. The extension will only be able to load modules that have already been loaded once.
        brackets.getModule = require;

        // Provide a way for anyone (including code not using require) to register a handler for the brackets 'ready' event
        // This event is like $(document).ready in that it will call the handler immediately if brackets is already done loading
        //
        // WARNING: This event won't fire if ANY extension fails to load or throws an error during init.
        // To fix this, we need to make a change to _initExtensions (filed as issue 1029)
        //
        // TODO (issue 1034): We *could* use a $.Deferred for this, except deferred objects enter a broken
        // state if any resolution callback throws an exception. Since third parties (e.g. extensions) may
        // add callbacks to this, we need to be robust to exceptions
        brackets.ready = _registerBracketsReadyHandler;
    }