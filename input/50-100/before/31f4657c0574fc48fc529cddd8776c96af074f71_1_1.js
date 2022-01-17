function(data) {
      var release, releases, _i, _len;
      releases = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        release = data[_i];
        Release.create(data);
        releases.push(this.release);
      }
      return releases;
    }