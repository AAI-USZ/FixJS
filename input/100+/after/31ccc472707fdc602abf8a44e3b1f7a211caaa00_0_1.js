function (evt) {
        var i;

        this.triggerEventHandlers(['mouseup', 'up'], evt);

        // redraw with high precision
        this.updateQuality = this.BOARD_QUALITY_HIGH;

        if (this.mouse && this.mouse.obj) {
            this.mouse.obj.snapToGrid();
        }

        this.originMoveEnd();
        this.dehighlightAll();
        this.update();

        for (i = 0; i < this.downObjects.length; i++) {
            this.downObjects[i].triggerEventHandlers(['mouseup', 'up'], evt);
        }

        this.downObjects.length = 0;

        if (this.hasMouseUp) {
            JXG.removeEvent(document, 'mouseup', this.mouseUpListener, this);
            this.hasMouseUp = false;
        }

        // release dragged mouse object
        this.mouse = null;
    }