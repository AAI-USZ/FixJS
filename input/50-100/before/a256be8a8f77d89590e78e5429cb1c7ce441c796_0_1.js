function (name) {
      if (regex) {
        if (name.match(regex))
          r.push(addPrefix + name);
      } else {
        r.push(addPrefix + name);
      }
    }