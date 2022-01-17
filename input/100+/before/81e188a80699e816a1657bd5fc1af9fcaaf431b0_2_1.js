function () {
    var v = new VIE();

    ok(v.BooleanLiteral);
    var booleanliteral = new v.BooleanLiteral();
    ok(booleanliteral.isLiteral);
    ok(booleanliteral instanceof Backbone.Model);
    equal(typeof booleanliteral.toString, "function");
    equal(typeof booleanliteral.toTurtle, "function");
    var trueLit = new v.BooleanLiteral(true);
    var falseLit = new v.BooleanLiteral(false);
    var falseNosetLit = new v.BooleanLiteral();

    ok(trueLit);
    ok(falseLit);
    ok(falseNosetLit);
    var tr = trueLit.get();
    var fa = falseLit.get();
    var fa2 = falseNosetLit.get();

    equal(tr, true);
    equal(fa, false);
    equal(fa2, false);

    equal(trueLit.toString(), "true");
    equal(trueLit.toTurtle(), "true");
    equal(falseLit.toString(), "false");
    equal(falseLit.toTurtle(), "false");
    equal(falseNosetLit.toString(), "false");
    equal(falseNosetLit.toTurtle(), "false");
}