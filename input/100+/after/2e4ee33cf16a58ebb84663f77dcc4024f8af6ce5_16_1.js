function() {
    var gc = 2;
    var view = new osgViewer.View();
    view.setGraphicContext(gc);
    ok(view.getGraphicContext() === 2, "Check graphic context");

    ok(view.getFrameStamp() !== undefined, "Check FrameStamp");

    ok(view.getScene() !== undefined, "Check scene");
    ok(view.getSceneData() === undefined, "Check scene data");
    ok(view.getScene().getStateSet() !== undefined, "Check scene stateset");

}