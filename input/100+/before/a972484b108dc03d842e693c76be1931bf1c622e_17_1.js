function (el, width, height) {
    var element = cc.$(el) || cc.$('#' + el);
    if (element.tagName == "CANVAS") {
        //it is already a canvas, we wrap it around with a div
        cc.container = cc.$new("DIV");
        cc.canvas = element;
        cc.canvas.parentNode.insertBefore(cc.container, cc.canvas);
        cc.canvas.appendTo(cc.container);
        cc.container.style.width = (width || cc.canvas.width || 480) + "px";
        cc.container.style.height = (height || cc.canvas.height || 320) + "px";
        cc.container.setAttribute('id', 'Cocos2dGameContainer');
    }
    else {//we must make a new canvas and place into this element
        if (element.tagName != "DIV") {
            cc.Log("Warning: target element is not a DIV or CANVAS");
        }
        cc.canvas = cc.$new("CANVAS");
        cc.canvas.addClass = "gameCanvas";
        cc.canvas.setAttribute("width", width || 480);
        cc.canvas.setAttribute("height", height || 320);
        cc.container = element;
    }
    cc.renderContext = cc.canvas.getContext("2d");
    cc.renderContextType = cc.CANVAS;
    if (cc.renderContextType == cc.CANVAS) {
        cc.renderContext.translate(0, cc.canvas.height);
        cc.drawingUtil = new cc.DrawingPrimitiveCanvas(cc.renderContext);
    }
    cc.originalCanvasSize = new cc.Size(cc.canvas.width, cc.canvas.height);

    cc.Log(cc.ENGINE_VERSION);

    //binding window size
    /*
     cc.canvas.addEventListener("resize", function () {
     if (!cc.firstRun) {
     cc.Director.getInstance().addRegionToDirtyRegion(new cc.Rect(0, 0, cc.canvas.width, cc.canvas.height));
     }
     }, true);
     */
}