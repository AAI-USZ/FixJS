function(set, arr) {
      var i = 0,
          missing = [],
          item;

      for (i; i < arr.length; i++) {
        item = arr[i];

        if (!set.has(item)) {
          missing.push(item);
        }
      }

      return (missing.length) ? missing : true;
    }