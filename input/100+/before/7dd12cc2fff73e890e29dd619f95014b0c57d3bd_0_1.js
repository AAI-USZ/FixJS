function (err, stdout, stderr, cmd) {
      if (err) {
        return callback.call(self, err, stdout, stderr, cmd);
      }

      stdout = (stdout||"").trim().replace(/\r\n|\r/g, "\n");

      var parts = stdout.split(" ");

      try {

        console.log(parts)
        self.data['Geometry'] = parts[2].split('+')[0];
        console.log(self.data)

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