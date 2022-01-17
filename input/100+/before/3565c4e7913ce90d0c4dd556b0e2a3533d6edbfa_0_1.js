function(err, out, code) {
    if (err) return callback(err, null);

    var ret;
    if (service) {
      var index, key, value;
      ret = {};
      // Parse the service output line-by-line
      out.trim().split('\n').forEach(function(line) {
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
            var obj = {},
                i = value.indexOf(' ');
            obj.pid = +value.substr(0, i);
            obj.cmd = value.substr(i+1);
            value = obj;
            if (!ret[key]) value = [value];
            break;
        }

        // Save the key:value. If the key already exists, make it a list
        ret[key] = (ret[key]) ? [].concat(ret[key], value) : value;
      });
    } else {
      // Return the list of fmris
      ret = out.trim().split('\n');
    }
    return callback(null, ret);
  }