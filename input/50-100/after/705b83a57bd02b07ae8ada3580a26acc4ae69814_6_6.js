function() {
    var f_bad, f_mult, f_single, o;
    f_single = function() {
      return this.name;
    };
    f_mult = function(s) {
      return this.name;
    };
    f_bad = function() {
      return this.age;
    };
    return o = {
      name: "Bob",
      single: f_single,
      mult: f_mult,
      bad: f_bad
    };
  }