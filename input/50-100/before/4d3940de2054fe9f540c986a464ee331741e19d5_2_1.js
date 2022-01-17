function (Tweenable, Underscore) {
    var underscoreSupportsAMD = (Underscore !== null);
    var deps = {  Tweenable: Tweenable,
                  // Some versions of Underscore.js support AMD, others don't.
                  // If not, use the `_` global.
                  underscore: underscoreSupportsAMD ? Underscore : _ };
    var Kapi = rekapi(global, deps);

    if (typeof KAPI_DEBUG !== 'undefined' && KAPI_DEBUG === true) {
      Kapi.underscore_version = deps.underscore.VERSION;
    }

    if (!underscoreAlreadyInUse && underscoreSupportsAMD) {
      // Prevent Underscore from polluting the global scope.
      // This global can be safely removed since Rekapi keeps its own reference
      // to Underscore via the `deps` object passed earlier as an argument.
      global._ = undefined;
    }

    return Kapi;
  }