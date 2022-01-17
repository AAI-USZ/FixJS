function (name) {
        name = "public$" + name;
        if (this.hasOwnProperty(name)) {
          return true;
        }
        return this.public$constructor.instance.prototype.hasOwnProperty(name);
      }