function() {
    var Cust, CustBad, f_bad, f_mult, f_single, o;
    Cust = __contracts.object({
      name: Str
    }, {});
    CustBad = __contracts.object({
      age: Num
    }, {});
    f_single = __contracts.guard(__contracts.fun([Cust], Str, {}),function() {
      return this.name;
    });
    f_mult = __contracts.guard(__contracts.fun([Str, Cust], Str, {}),function(s) {
      return this.name;
    });
    f_bad = __contracts.guard(__contracts.fun([CustBad], Num, {}),function() {
      return this.age;
    });
    return o = {
      name: "Bob",
      single: f_single,
      mult: f_mult,
      bad: f_bad
    };
  }