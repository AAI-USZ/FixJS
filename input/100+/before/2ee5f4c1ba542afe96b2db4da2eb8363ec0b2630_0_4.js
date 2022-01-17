function() {
        
        var ec = this.eventCanvas._ctx.canvas;
        var master = this.plugins._interactor;
        if (master && master.interactors && master.interactors.length > 0) {
            master.Canvas = new $.jqplot.GenericCanvas();
            this.eventCanvas._elem.before(master.Canvas.createElement(this._gridPadding, 'jqplot-interactor-canvas', this._plotDimensions, this));
            master.Canvas.setContext();
            master.context = master.Canvas._ctx;
            master.canvas = master.context.canvas;
            //master.context.globalAlpha = 0.6;
            //master.context.lineJoin = 'round';
            
            ec.onmousemove = bind(master, master.onMouseMove);
            ec.onmousedown = bind(master, master.onMouseDown);
            
            ec.onmouseup = bind(master, master.onMouseUp);
            ec.onmousewheel = bind(master, master.onMouseWheel);
            ec.ondblclick = bind(master, master.onDoubleClick);
            ec.onselectstart = function() { return false; };
            
            if (!ec._touchstartregistered && ec.addEventListener) {
                ec.addEventListener('touchstart', function(event) {
                    ec.onmousedown(event.touches[0]);
                }, false);
                ec._touchstartregistered = true;
            }
            if (!ec._touchmoveregistered && ec.addEventListener) {
                ec.addEventListener('touchmove', function(event) {
                    event.preventDefault();
                    ec.onmousemove(event.touches[0]);
                }, false);
                ec._touchmoveregistered = true;
            }
            if (!ec._touchendregistered && ec.addEventListener) {
                ec.addEventListener('touchend', function(event) {
                    event.preventDefault();
                    ec.onmouseup(event.touches[0]);
                }, false);
                ec._touchendregistered = true;
            }
            
            if (!ec._scrollregistered && ec.addEventListener) {
                ec.addEventListener('DOMMouseScroll', function(event) {
                    ec.onmousewheel(event);
                });
                ec._scrollregistered = true;
            }
            
            for (var i in this.plugins.interactors) {
                var I = this.plugins.interactors[i];
                //I.Canvas = master.Canvas;
                I.Canvas = new $.jqplot.GenericCanvas();
                this.eventCanvas._elem.before(I.Canvas.createElement(this._gridPadding, 'jqplot-interactor-'+I.name+'-canvas', this._plotDimensions, this));
                I.Canvas.setContext();
                I.context = I.Canvas._ctx;
                I.canvas = I.context.canvas;
                I.context.globalAlpha = 0.6;
                I.context.lineJoin = 'round';
                //var ec = this.eventCanvas._ctx.canvas;
                
                //this.eventCanvas._elem.before(I.Canvas.createElement(this._gridPadding, 'jqplot-interactor-canvas', this._plotDimensions));
                //I.redraw(); // first one updates the pos (in pixel units) of everything;
                //I.redraw(); // second one finishes the draw.
            }
            master.redraw();
            master.redraw();
        }
    }