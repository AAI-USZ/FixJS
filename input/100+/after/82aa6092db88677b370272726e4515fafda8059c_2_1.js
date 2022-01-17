function(action, name) {
        var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
        var cache = typeof action.cache !=="undefined" ? action.cache : false;  //monkey patch
        Resource[name] = function(a1, a2, a3, a4) {
          var params = {};
          var data;
          var success = noop;
          var error = null;
          switch(arguments.length) {
          case 4:
            error = a4;
            success = a3;
            //fallthrough
          case 3:
          case 2:
            if (isFunction(a2)) {
              if (isFunction(a1)) {
                success = a1;
                error = a2;
                break;
              }

              success = a2;
              error = a3;
              //fallthrough
            } else {
              params = a1;
              data = a2;
              success = a3;
              break;
            }
          case 1:
            if (isFunction(a1)) success = a1;
            else if (hasBody) data = a1;
            else params = a1;
            break;
          case 0: break;
          default:
            throw "Expected between 0-4 arguments [params, data, success, error], got " +
              arguments.length + " arguments.";
          }

          var value = this instanceof Resource ? this : (action.isArray ? [] : new Resource(data));
          $http({
            method: action.method,
            url: route.url(extend({}, extractParams(data), action.params || {}, params)),
            data:data,
            cache:cache // monkey patch
          }).then(function(response) {
              var data = response.data;
              //value.__proto__.config = response.config; //monkey patch
              if (data) {
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function(item) {
                    value.push(new Resource(item));
                  });
                } else {
                  copy(data, value);
                }
              }
              (success||noop)(value, response.headers);
            }, error);
          return value;
        };


        Resource.bind = function(additionalParamDefaults){
          return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
        };


        Resource.prototype['$' + name] = function(a1, a2, a3) {
          var params = extractParams(this),
              success = noop,
              error;

          switch(arguments.length) {
          case 3: params = a1; success = a2; error = a3; break;
          case 2:
          case 1:
            if (isFunction(a1)) {
              success = a1;
              error = a2;
            } else {
              params = a1;
              success = a2 || noop;
            }
          case 0: break;
          default:
            throw "Expected between 1-3 arguments [params, success, error], got " +
              arguments.length + " arguments.";
          }
          var data = hasBody ? this : undefined;
          Resource[name].call(this, params, data, success, error);
        };
      }