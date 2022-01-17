function() {
      return {
        $: {
          config: {
            get: function(name, def) {
              var _ref1;
              return (_ref1 = process.env[name]) != null ? _ref1 : def;
            }
          }
        }
      };
    }