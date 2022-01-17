function () {
        if (arguments.length === 2) {
          return new XMLElement(arguments[0], arguments[1], null, null);
        }
        return new XMLElement(arguments[0], arguments[1], arguments[2], arguments[3]);
      }