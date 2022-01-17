function(err, row) {
        if (!err) {
          return cookie.push(row.name + "=" + row.value);
        }
      }