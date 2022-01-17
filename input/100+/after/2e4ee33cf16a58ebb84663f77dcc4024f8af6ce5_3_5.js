function createScene() {
    var root = new osg.Camera();
    root.setComputeNearFar(false);

    if (true) {
        (function() {
            osgDB.Promise.when(osgDB.parseSceneGraph(getOgre())).then(function(model) {
                var project = createProjectedShadowScene(model);
                project.setMatrix(osg.Matrix.makeTranslate(-10,0,0.0,[]));
                root.addChild(project);
            });
        })();
    }

    if (true) {
        (function() {
            osgDB.Promise.when(osgDB.parseSceneGraph(getOgre())).then(function(model) {
                var texproject = createTextureProjectedShadowScene(model);
                texproject.setMatrix(osg.Matrix.makeTranslate(0,0,0.0,[]));
                root.addChild(texproject);
            });
        })();
    }

    if (true) {
        (function() {
            osgDB.Promise.when(osgDB.parseSceneGraph(getOgre())).then(function(model) {
                var shadowmap = createShadowMapScene(model);
                shadowmap.setMatrix(osg.Matrix.makeTranslate(10,0,0.0,[]));
                root.addChild(shadowmap);
            });
        })();
    }

    return root;
}