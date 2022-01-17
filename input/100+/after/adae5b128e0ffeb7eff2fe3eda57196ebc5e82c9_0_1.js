function(e) {
        if (mouseDown) {
            var x = e.pageX - $(element).offset().left;
            var y = e.pageY - $(element).offset().top;

            /*
             * Gaps appear between points when mouse is moved fast. As a
             * workaround, join current and previous points by a path.
             */
            canvas.path( 'M' + previousPoint.x + ' ' + previousPoint.y + 'L' + x + ' ' + y ).attr( {
                'stroke-width': thickness * 2 + 1,
                'stroke'      : colour
            } );

            drawCircle( x, y );
            previousPoint = { 'x': x, 'y': y };
        }
    }