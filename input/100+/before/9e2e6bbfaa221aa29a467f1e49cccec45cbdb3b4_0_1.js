function(err, fetched) {
        // change key in resStore
        var keys = key.split('.');
        var x = 0;
        var value = fetched[lng][ns];
        while (keys[x]) {
            if (x === keys.length - 1) {
                value = value[keys[x]] = newValue;
            } else {
                value = value[keys[x]] = value[keys[x]] || {};
            }
            x++;
        }

        var filename = this.functions.applyReplacement(this.resSetPath, {lng: lng, ns: ns});

        var self = this;
        fs.writeFile(filename, JSON.stringify(fetched[lng][ns], null, 4), function (err) {
            if (err) {
                self.functions.log('error updating key `' + key + '` with value `' + newValue + '` to: ' + filename);
            } else {
                self.functions.log('updated key `' + key + '` with value `' + newValue + '` to: ' + filename);
            }
        });
      }