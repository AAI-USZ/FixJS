function () {
    var v = new VIE();
    ok(v.PlainLiteral);
    
    var literal = new v.PlainLiteral();
    equal(typeof literal.toString, "function");
    equal(typeof literal.toTurtle, "function");
    equal(typeof literal.isLiteral, "boolean");
    equal(typeof literal.isPlainLiteral, "boolean");
    ok(literal instanceof Backbone.Model);
}