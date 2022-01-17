function(data, type, name) {
        var key, prop, x;
        x = [];
        for (key in data) {
          prop = data[key];
          if (prop.type === type && key.indexOf(name.substr(1)) !== -1) {
            x.push("@" + key);
          }
        }
        return x;
      }