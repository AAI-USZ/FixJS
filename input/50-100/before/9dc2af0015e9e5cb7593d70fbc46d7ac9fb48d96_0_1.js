function(value, data, done) {
        // An additional value, safe to use as a JavaScript identifier.
        data.js_safe_name = value.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
        // If no value is passed to `done`, the original property isn't modified.
        done();
      }