function() {

        var clip = this.getFullClip();

        this.copyObj.setCopy( this.canvas, clip.x, clip.y, clip.w, clip.h );

        this.drawSafe( function() {

                this.canvas.ctx.clearRect( clip.x, clip.y, clip.w, clip.h );

        } );

        this.endDraw( clip );



        this.events.run( 'onCopy' );

        this.marquee.clear();



        return this;

    }