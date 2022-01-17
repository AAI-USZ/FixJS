function (name) {
        name = "public$" + name;
        if (this.hasOwnProperty(name)) {
          return true;
        }
        // Object.getPrototypeOf(this) are traits, not the dynamic prototype.
        return Object.getPrototypeOf(this).hasOwnProperty(name);
      }