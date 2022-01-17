function () {
        var i,
            mouse = a2d.mousePosition ? new a2d.Position(a2d.mousePosition.X, a2d.mousePosition.Y) : new a2d.Position(0, 0);
        if(mouse && mouse.isInside(this.boundingBox)) {            
            if(!this.hover) {
                this.fireEvent("mouseover");
                this.fireEvent("hover");
                this.hover = true;
            }
        } else {
            if(this.hover) {
                this.fireEvent("mouseout");
                this.hover = false;
            }
        }
        if(this.visible) {
            for (i = 0; i < this.length; i++) {
                this[i].draw();
            }            
        }
        this.fireEvent("draw");
        if(a2d.drawCounter !== undefined) {
            a2d.drawCounter++;
        }
    }