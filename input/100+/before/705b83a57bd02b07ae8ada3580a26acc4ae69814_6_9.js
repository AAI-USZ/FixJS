function() {
    var Person, p;
    Person = __contracts.guard(__contracts.fun([Str], __contracts.object({
      name: __contracts.fun([Any], Str, {})
    }, {}), {
      newOnly: true
    }),(function() {

      function _Class(firstName) {
        this.firstName = firstName;
      }

      _Class.prototype.name = function() {
        return this.firstName;
      };

      return _Class;

    })());
    return p = new Person("bob");
  }