function(data, type, name) {
        var key, prop, x;
        x = [];
        for (key in data) {
          prop = data[key];
          if (prop.type === type) {
            x.push("@" + key);
          }
        }
        return x;
      }