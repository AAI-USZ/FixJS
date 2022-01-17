function() {

    (function() {
        var canvas = createCanvas();
        var viewer = new osgViewer.Viewer(canvas);
        viewer.init();

        var l0 = new osg.Light();
        l0.setLightNumber(0);
        var l1 = new osg.Light();
        l1.setLightNumber(1);

        var q = osg.createTexturedQuadGeometry(-25,-25,0,
                                       50, 0 ,0,
                                       0, 50 ,0);

        q.getOrCreateStateSet().setAttributeAndMode(l0);
        q.getOrCreateStateSet().setAttributeAndMode(l1);

        var state = viewer.getState();
        state.setGraphicContext(createFakeRenderer());

        viewer.setSceneData(q);
        viewer.frame();
    })();


    (function() {

        var root = new osg.Node();
        var node0 = new osg.Node();
        var node1 = new osg.Node();

        root.addChild(node0);
        root.addChild(node1);

        var l0 = new osg.Light();
        l0.setLightNumber(0);
        l0.setName("enableLight0");
        node0.getOrCreateStateSet().setAttributeAndMode(l0);
        
        var l1 = new osg.Light();
        l1.setLightNumber(1);
        l1.setName("enableLight1");

        node1.getOrCreateStateSet().setAttributeAndMode(l1);
        var q = osg.createTexturedQuadGeometry(-25,-25,0,
                                       50, 0 ,0,
                                       0, 50 ,0);

        var ld0 = new osg.Light();
        ld0.setLightNumber(0);
        ld0.setName("disableLight0");

        var ld1 = new osg.Light();
        ld1.setLightNumber(1);
        ld1.setName("disableLight1");

        node0.addChild(q);
        node0.getOrCreateStateSet().setAttributeAndMode(ld1);

        node1.addChild(q);
        node1.getOrCreateStateSet().setAttributeAndMode(ld0);

        var cull = new osg.CullVisitor();
        var rs = new osg.RenderStage();
        var sg = new osg.StateGraph();
        cull.pushProjectionMatrix(osg.Matrix.makeIdentity([]));
        cull.pushModelviewMatrix(osg.Matrix.makeIdentity([]));
        cull.setRenderStage(rs);
        cull.setStateGraph(sg);
        
        root.accept(cull);
    })();

    ok(true, "check no exception");
}