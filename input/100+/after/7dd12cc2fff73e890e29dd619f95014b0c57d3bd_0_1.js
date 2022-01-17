function (err, stdout, stderr, cmd) {
      if (err) {
        return callback.call(self, err, stdout, stderr, cmd);
      }

      stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n");

      var parts = stdout.split(" ");

      try {

        self.data['Geometry'] = parts[2].split('+')[0];

        Object.keys(self.data).forEach(function(key) {
          helper[key](self.data, self.data[key]);
        })

      } catch (err) {
        err.message = err.message + "\n\n  Identify stdout:\n  " + stdout
        throw err;
      }

      var idx = self._iq.length;

      while (idx--) {
        self._iq[idx].call(self, null, self.data);
      }

      self._identifying = false;
    }