function(val) {
      val = val || 0;

      if(!isInt(val)) {
        errback('ERROR: Cannot increment a non-integer value.');

        return;
      }

      var newValue = val + increment;
      setValue(osName, trans, uuid, key, newValue, function(res) {
        cb.call(self, res === 'OK' ? newValue : 'ERR');
      }, errback, self);

    }