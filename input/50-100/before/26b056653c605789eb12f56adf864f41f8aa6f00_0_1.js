function( context ) {
        
        var border = this.border();
        if ( border ) {
            var size = this.size();
            context.strokeStyle = border;
            context.rect( 0, 0, size.w - 1, size.h - 1 );
            context.stroke();
        }

    }