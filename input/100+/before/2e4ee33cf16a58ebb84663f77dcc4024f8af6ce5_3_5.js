function() {

    var canvas = document.getElementById("3DView");
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var stats = document.getElementById("Stats");

    var viewer;
    try {
        viewer = new osgViewer.Viewer(canvas, {antialias : true, premultipliedAlpha: true });
        viewer.init();
        viewer.setupManipulator();
        var rotate = new osg.MatrixTransform();
        rotate.addChild(createScene());
        //viewer.getCamera().setClearColor([0.3, 0.3, 0.3, 0.0]);
        viewer.getCamera().setClearColor([0.0, 0.0, 0.0, 0.0]);
        viewer.setSceneData(rotate);
        viewer.getManipulator().computeHomePosition();
        viewer.run();


        var mousedown = function(ev) {
            ev.stopPropagation();
        };
        document.getElementById("explanation").addEventListener("mousedown", mousedown, false);

    } catch (er) {
        osg.log("exception in osgViewer " + er);
    }
}