function(x, y, w, h) {

        var _this = this;

        var cCtx = _this.canvas.ctx,

            oCtx = _this.overlay.ctx;



        this.removeClip();



        _this.clipping = {

                x: x,

                y: y,

                w: w,

                h: h

        };



        cCtx.save();

        cCtx.beginPath();

        cCtx.rect( x, y, w, h );

        cCtx.clip();



        oCtx.save();

        oCtx.beginPath();

        oCtx.rect( x, y, w, h );

        oCtx.clip();



        _this.events.run( 'onClip', _this.clipping );



        return _this;

    }