function() {

        if ( this.copyObj.hasPaste() ) {

            var clip = this.getFullClip();



            if ( this.copyObj.overlapsPaste(clip) ) {

                this.drawSafe( function() {

                    this.copyObj.draw( this.canvas );

                    this.overlay.ctx.clearRect( 0, 0, this.width, this.height );

                    this.endDraw( clip );

                } );

            }



            this.clearPaste();

        }



        return this;

    }