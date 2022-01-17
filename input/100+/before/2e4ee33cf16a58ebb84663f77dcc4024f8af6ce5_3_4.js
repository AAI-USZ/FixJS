function createScene() {
    var root = new osg.Camera();
    root.setComputeNearFar(false);

    if (true) {
        var project = createProjectedShadowScene();
        project.setMatrix(osg.Matrix.makeTranslate(-10,0,0.0,[]));
        root.addChild(project);
    }

    if (true) {
        var texproject = createTextureProjectedShadowScene();
        texproject.setMatrix(osg.Matrix.makeTranslate(0,0,0.0,[]));
        root.addChild(texproject);
    }

    if (true) {
        var shadowmap = createShadowMapScene();
        shadowmap.setMatrix(osg.Matrix.makeTranslate(10,0,0.0,[]));
        root.addChild(shadowmap);
    }


    return root;
}