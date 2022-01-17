function () {
    var v = new VIE();
    
    ok(v.LiteralCollection);
    equal(typeof v.LiteralCollection.toString, "function");

    ok(v.isLiteralCollection);
    equal(typeof v.isLiteralCollection, "boolean");
}