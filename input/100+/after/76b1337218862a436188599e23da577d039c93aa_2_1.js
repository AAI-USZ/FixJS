function(canvas, options, error) {
    osgViewer.View.call(this);

    if (options === undefined) {
        options = {antialias : true};
    }

    if (osg.SimulateWebGLLostContext) {
        canvas = WebGLDebugUtils.makeLostContextSimulatingCanvas(canvas);
        canvas.loseContextInNCalls(osg.SimulateWebGLLostContext);
    }

    gl = WebGLUtils.setupWebGL(canvas, options, error );
    var self = this;
    canvas.addEventListener("webglcontextlost", function(event) {
        self.contextLost();
        event.preventDefault();
    }, false);

    canvas.addEventListener("webglcontextrestored", function() {
        self.contextRestored();
    }, false);


    if (osg.reportWebGLError) {
        gl = WebGLDebugUtils.makeDebugContext(gl);
    }


    if (gl) {
        this.setGraphicContext(gl);
        osg.init();
        this._canvas = canvas;
        this._frameRate = 60.0;
        osgUtil.UpdateVisitor = osg.UpdateVisitor;
        osgUtil.CullVisitor = osg.CullVisitor;
        this._urlOptions = true;

        this._mouseWheelEventNode = canvas;
        this._mouseEventNode = canvas;
        this._keyboardEventNode = document;
        if (options) {
            if(options.mouseWheelEventNode){
                this._mouseWheelEventNode = options.mouseWheelEventNode;
            }
            if(options.mouseEventNode){
                this._mouseEventNode = options.mouseEventNode;
            }
            if(options.keyboardEventNode){
                this._keyboardEventNode = options.keyboardEventNode;
            }
        }

        this.setUpView(canvas);
    } else {
        throw "No WebGL implementation found";
    }
}