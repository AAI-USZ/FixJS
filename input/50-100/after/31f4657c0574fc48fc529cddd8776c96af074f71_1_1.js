function(data) {
      var rel, release, releases, _i, _len;
      releases = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        release = data[_i];
        rel = Release.create(release);
        releases.push(rel);
      }
      return releases;
    }