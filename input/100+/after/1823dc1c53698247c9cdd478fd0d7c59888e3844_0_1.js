function(options) {
      options || (options = {});

      var _this = this,
          methods = options.methods,
          json = _.clone(this.attributes),
          namespace = options.namespace || _.result(this, 'namespace'),
          transform = options.transform || _.result(this, 'toJSONKeysTransform');

      if (methods) {
        if (_.isString(methods)) methods = [methods];

        _.each(methods, function (args, method, list) {
          // handle array being passed instead of object
          if ( _.isArray(list) ) {
            method = args;
            args = [];
          }

          json[method] = _this[method].apply(_this, args);
        });
      }

      if (transform && !(options.transform === false)) {
        var data = {};

        _.each(json, function (prop, key, list) {
          data[ _this["_" + transform](key) ] = prop;
        });

        json = data;
      }

      if (namespace && !(options.namespace === false)) {
        var result = {}
        result[namespace] = json;
        json = result;
      }

      return json;
    }