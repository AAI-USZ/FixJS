function (fmt, obj, named) {
          if (!fmt) return "";
          if (!fmt.replace) {
            return fmt;
          }
          if (_.isArray(obj) || named === false) {
            return fmt.replace(/%s/g, function(match){return String(obj.shift())});
          } else if (_.isObject(obj) || named === true) {
            return fmt.replace(/%\(\s*([^)]+)\s*\)/g, function(m, v){
              return String(obj[v]);
            });
          }
        }