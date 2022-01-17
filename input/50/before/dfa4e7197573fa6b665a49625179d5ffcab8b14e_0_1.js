function(err, data) {
        var props = yaml.load(data.split(/\n\n/)[0]);
        sort(err, props.time);
      }