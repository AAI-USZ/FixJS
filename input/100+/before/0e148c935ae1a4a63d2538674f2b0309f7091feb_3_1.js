function(t) {
    var d = new Dog();
    var k = new Kitty();
    var w = new Whale(); // ok now :)

    // typeof test
    t.equal($.typeof(new Date()), "date", "type of string fail");

    t.equal($.typeof("string"), "string", "type of string fail");
    t.equal($.typeof([]), "array", "type of array fail");
    t.equal($.typeof(new Array(1)), "array", "type of array fail");
    t.equal($.typeof(1), "number", "number 1 fail");
    t.equal($.typeof(1.0), "number", "number 1.0 fail");
    t.equal($.typeof(NaN), "null", "Nan fail");
    t.equal($.typeof(false), "boolean", "boolean fail");
    t.equal($.typeof(true), "boolean", "boolean fail");
    t.equal($.typeof(undefined), "null", "undefined fail");
    t.equal($.typeof(null), "null", "null fail");
    t.equal($.typeof({}), "object", "object fail");
    t.equal($.typeof(Infinity), "number", "object fail");

    (function() {
    t.equal($.typeof(arguments), "arguments", "undefined fail");
    }());

    (function() {
    t.equal($.typeof(arguments), "arguments", "undefined fail");
    }({x:1}));

    (function() {
    t.equal($.typeof(arguments), "arguments", "undefined fail");
    }(1, 1));

    t.equal($.typeof(d), "Dog", "class name fail");
    t.equal($.typeof(k), "Kitty", "class name fail");
    t.equal($.typeof(w), "Whale", "class name fail");

    t.end();
}