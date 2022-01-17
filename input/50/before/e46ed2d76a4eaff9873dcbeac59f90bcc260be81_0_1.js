function (e, res) {
        if(typeof oldid !== 'undefined') {
          instance[key] = oldid;
        }
        if (callback) {
          callback(e, instance);
        }
      }