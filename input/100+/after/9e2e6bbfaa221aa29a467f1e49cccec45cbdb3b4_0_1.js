function(ns, lng, key, newValue) {
        var self = this;
        this.load([lng], {ns: {namespaces: [ns]}}, function(err, fetched) {
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

            var filename = self.functions.applyReplacement(self.options.resSetPath, {lng: lng, ns: ns});

            fs.writeFile(filename, JSON.stringify(fetched[lng][ns], null, 4), function (err) {
                if (err) {
                    self.functions.log('error updating key `' + key + '` with value `' + newValue + '` to: ' + filename);
                } else {
                    self.functions.log('updated key `' + key + '` with value `' + newValue + '` to: ' + filename);
                }
            });
        });
    }