function() {
        var contentBox = this.get('contentBox'),
            offset     = contentBox.getXY(),
            offsetX = offset[0],
            offsetY = offset[1],
            graphic = new Y.Graphic({ autoSize : true }),

            size    = this.get('size'),
            stops   = this.get('colorstops'),

            outline, slice;

        outline = this.outline = graphic.addShape({
            type   : Y.Circle,
            radius : size,
            x : offsetX,
            y : offsetY,
            stroke : {
                weight : 1,
                color  : stops[0].outline
            },
            fill : {
                color: stops[0].progress
            }
        });

        slice = this.slice = graphic.addShape({
            type   : "pieslice",
            radius : size - 1,
            startAngle : -90,
            x : offsetX + size, y : offsetY + size,
            fill : {
                color : stops[0].background
            },
            stroke : { weight : 0 }
        });

        graphic.render( contentBox );
        this.graphic = graphic;

        return this;
    }