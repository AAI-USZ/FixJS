function(name) {
        if (name in allowedFields) {
          var destination = Object.getOwnPropertyDescriptor(from, name);

          if (destination) {
            Object.defineProperty(dest, name, destination);
          }
        }
      }