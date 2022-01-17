function() {

        var clip = this.getFullClip();



        this.copyObj.setCopy( this.canvas, clip.x, clip.y, clip.w, clip.h );

        this.events.run( 'onCopy' );

        this.marquee.clear();



        return this;

    }