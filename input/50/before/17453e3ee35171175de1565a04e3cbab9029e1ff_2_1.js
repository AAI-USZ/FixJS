function(json) {
        var latest = json.commits[0];
        cb(latest);
      }