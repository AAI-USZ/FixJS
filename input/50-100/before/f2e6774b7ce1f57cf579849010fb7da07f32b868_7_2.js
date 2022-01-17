function(id) {
      var parts = id.split('-'),
          date,
          type;

      if (parts.length > 1) {
        type = parts.shift();
        switch (type) {
          case 'd':
            date = new Date(parts[0], parts[1], parts[2]);
            break;
          case 'm':
            date = new Date(parts[0], parts[1]);
            break;
        }

        return date;
      }

      return false;
    }