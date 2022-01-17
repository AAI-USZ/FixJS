function(a1, a2, a3, a4) {
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
            data: data
          }).then(function(response) {
              var data = response.data;

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
        }