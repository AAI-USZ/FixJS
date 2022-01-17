function() {

      function _Class(firstName) {
        this.firstName = firstName;
      }

      _Class.prototype.name = function() {
        return this.firstName;
      };

      return _Class;

    }