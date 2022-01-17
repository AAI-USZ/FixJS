function(line) {
        // I hate javascript 'split()', poor man fix
        index = line.match(/\s+/).index;

        // Extract the key and the value
        key = line.substr(0, index);
        value = autocast(line.substr(index).trim());

        // Key specific parsing
        switch (key) {
          case 'dependency':
            if (!ret[key]) value = [value];
            break;
          case 'process':
            var obj = {};
            if (typeof value === 'string') {
              // Process has pid and name
              var i = value.indexOf(' ');
              obj.pid = +value.substr(0, i);
              obj.cmd = value.substr(i+1);
            } else {
              // Process only has pid
              obj.pid = value;
            }
            value = obj;
            if (!ret[key]) value = [value];
            break;
        }

        // Save the key:value. If the key already exists, make it a list
        ret[key] = (ret[key]) ? [].concat(ret[key], value) : value;
      }