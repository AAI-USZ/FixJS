function() {
        same(osg.Vec2.normalize([2,4],[]), [ 0.4472135954999579, 0.8944271909999159 ], "test normalize");
        same(osg.Vec2.normalize([0,0],[]), [ 0.0, 0.0 ], "test normalize");
    }