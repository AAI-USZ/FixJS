function(complete) {
          var argsClone, fn;
          argsClone = (args || []).slice();
          argsClone.push(complete);
          fn = object[action];
          return fn.apply(object, argsClone);
        }