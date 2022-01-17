function() {

    (function() {
        var a = [2,3];
        var b = [];
        deepEqual(osg.Vec2.copy(a, b), a, "test copy operation");
    })();

    (function() {
        ok(osg.Vec2.valid(["a",0]) === false, "is invalid");
        ok(osg.Vec2.valid([0,"a"]) === false, "is invalid");
        ok(osg.Vec2.valid([0,2]) === true, "is invalid");
    })();

    (function() {
        deepEqual(osg.Vec2.mult([2,4], 2.0, []), [4,8], "test mult");
    })();

    (function() {
        deepEqual(osg.Vec2.length2([2,4]), 20, "test length2");
    })();

    (function() {
        deepEqual(osg.Vec2.length([2,4]), Math.sqrt(20), "test length");
    })();

    (function() {
        deepEqual(osg.Vec2.normalize([2,4],[]), [ 0.4472135954999579, 0.8944271909999159 ], "test normalize");
        deepEqual(osg.Vec2.normalize([0,0],[]), [ 0.0, 0.0 ], "test normalize");
    })();

    (function() {
        deepEqual(osg.Vec2.dot([2,4],[2,4]), 20, "test dot product");
    })();

    (function() {
        deepEqual(osg.Vec2.sub([2,4],[2,4],[]), [0,0], "test sub");
    })();

    (function() {
        deepEqual(osg.Vec2.add([-2,-4],[2,4],[]), [0,0], "test add");
    })();

    (function() {
        deepEqual(osg.Vec2.neg([-2,-4],[]), [2,4], "test neg");
    })();


}