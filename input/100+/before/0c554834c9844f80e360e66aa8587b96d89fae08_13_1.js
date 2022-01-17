function () {
    //Browser Support Information
    //event register
    var gameCanvas;
    switch (arguments.length) {
        case 0:
            //add canvas at document
            gameCanvas = document.createElement("Canvas");
            gameCanvas.setAttribute("id", "gameCanvas");
            gameCanvas.setAttribute("width", 480);
            gameCanvas.setAttribute("height", 320);
            document.body.appendChild(gameCanvas);
            cc.canvas = gameCanvas;
            cc.renderContext = cc.canvas.getContext("2d");
            cc.gameDiv = document.body;
            cc.renderContextType = cc.CANVAS;
            //document
            break;
        case 1:
            var name = arguments[0];
            var getElement = null;
            if (typeof(name) == "string") {
                getElement = document.getElementById(name);
            } else {
                getElement = arguments[0];
            }

            if (getElement instanceof HTMLCanvasElement) {
                //HTMLCanvasElement
                cc.canvas = getElement;
                cc.gameDiv = getElement.parentNode;
                cc.renderContext = cc.canvas.getContext("2d");
                cc.renderContextType = cc.CANVAS;
            } else if (getElement instanceof HTMLDivElement) {
                //HTMLDivElement
                gameCanvas = document.createElement("Canvas");
                gameCanvas.setAttribute("id", "gameCanvas");
                gameCanvas.setAttribute("width", getElement.width);
                gameCanvas.setAttribute("height", getElement.height);
                getElement.appendChild(gameCanvas);
                cc.canvas = gameCanvas;
                cc.renderContext = cc.canvas.getContext("2d");
                cc.gameDiv = getElement;
                cc.renderContextType = cc.CANVAS;
            }
            break;
        case 2:
            break;
        case 3:
            break;
    }

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
     cc.Director.sharedDirector().addRegionToDirtyRegion(new cc.Rect(0, 0, cc.canvas.width, cc.canvas.height));
     }
     }, true);
     */
}