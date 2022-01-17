function() {

    var view = new osgViewer.View();
    view.getCamera().setViewport(new osg.Viewport());
    view.getCamera().setViewMatrix(osg.Matrix.makeLookAt([0,0,-10], [0,0,0], [0,1,0]), []);
    view.getCamera().setProjectionMatrix(osg.Matrix.makePerspective(60, 800/600, 0.1, 100.0, []));
    var quad = osgDB.parseSceneGraph(Scene);
    view.setSceneData(quad);

    var result = view.computeIntersections(400,300);
    //console.log(result);
    ok(result.length === 1, "Hits should be 1 and result is " + result.length );


}