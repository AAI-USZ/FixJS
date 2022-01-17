function () {
    var v = new VIE();

    ok(v.NumberLiteral);
    var numberliteral = new v.NumberLiteral();
    ok(numberliteral.isLiteral);
    ok(numberliteral instanceof Backbone.Model);
    equal(typeof numberliteral.toString, "function");
    equal(typeof numberliteral.toTurtle, "function");
    var intLit = new v.NumberLiteral(3);
    var doubLit = new v.NumberLiteral(17.12);
    var negIntLit = new v.NumberLiteral(-15);

    ok(intLit);
    ok(doubLit);
    ok(negIntLit);
    var inte = intLit.get();
    var doub = doubLit.get();
    var negInt = negIntLit.get();

    equal (typeof inte, "number");
    equal (typeof doub, "number");
    equal (typeof negInt, "number");
    
    equal(inte, 3);
    equal(doub, 17.12);
    equal(negInt, -15);

    equal(intLit.toString(), "3");
    equal(intLit.toTurtle(), "3");
    equal(doubLit.toString(), "17.12");
    equal(doubLit.toTurtle(), "17.12");
    equal(negIntLit.toString(), "-15");
    equal(negIntLit.toTurtle(), "-15");
}