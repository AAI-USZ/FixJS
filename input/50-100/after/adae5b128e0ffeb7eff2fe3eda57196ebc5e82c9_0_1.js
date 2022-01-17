function(e) {
        var x = e.pageX - $(element).offset().left;
        var y = e.pageY - $(element).offset().top;

        mouseDown = true;
        drawCircle( x, y );
    }