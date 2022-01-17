function(projects) {
        if (projects && projects.length > 0) {
          callback(projects.slice(0));
        } else {
          callback([]);
        }
      }