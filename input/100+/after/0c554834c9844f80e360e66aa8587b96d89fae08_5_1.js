function () {
        this._layerCanvas = document.createElement("canvas");
        this._layerCanvas.width = cc.canvas.width;
        this._layerCanvas.height = cc.canvas.height;
        this._layerId = "lazyCanvas" + Date.now();
        this._layerCanvas.id = this._layerId;
        this._layerCanvas.style.zIndex = this._canvasZOrder;
        this._layerCanvas.style.position = "absolute";
        this._layerCanvas.style.top = "0";
        this._layerCanvas.style.left = "0";
        this._layerContext = this._layerCanvas.getContext("2d");
        this._layerContext.fillStyle = "rgba(0,0,0,1)";
        this._layerContext.translate(0, this._layerCanvas.height);
        cc.container.appendChild(this._layerCanvas);
        var selfPointer = this;
        window.addEventListener("resize", function (event) {
            selfPointer.adjustSizeForCanvas();
        });
    }