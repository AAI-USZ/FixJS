function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        mouseDown = true;
        drawCircle( x, y );
    }