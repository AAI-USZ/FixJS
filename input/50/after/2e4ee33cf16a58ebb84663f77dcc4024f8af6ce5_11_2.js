function() {
        var a = [2,3];
        var b = [];
        deepEqual(osg.Vec2.copy(a, b), a, "test copy operation");
    }