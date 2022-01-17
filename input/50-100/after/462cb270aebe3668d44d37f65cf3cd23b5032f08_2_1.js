function extend(from, names) {
        names = names || Object.getOwnPropertyNames(from);
        names.forEach(function (name) {
          if (!(this.hasOwnProperty(name))) {
            var prop = Object.getOwnPropertyDescriptor(from, name);
            Object.defineProperty(this, name, prop);
          }
        });
        return this;
      }