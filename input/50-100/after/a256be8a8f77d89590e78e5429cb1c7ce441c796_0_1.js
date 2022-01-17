function (name) {
      // Filter out numeric indices
      if(!name.match(/^[0-9]*$/)) {
        if (regex) {
          if (name.match(regex))
            r.push(addPrefix + name);
        } else {
          r.push(addPrefix + name);
        }
      }
    }