function(e){

        // First we save the starting position of the mouse drag
        var startx = e.pageX;
        var starty = e.pageY;
        // and the starting position of the Canvas.
        var o = Canvas.offset();
        var l = o.left;
        var t = o.top;

        // Then we bind a function so that when the mouse moves we calculate how much it moved since the drag started and modify the top and left CSS properties of the Canvas to move it along with the pointer.
        frame.mousemove(function(e){
            Canvas.offset(posit(
                    l + (e.pageX - startx),
                    t + (e.pageY - starty)
            ));
            return false;

        // Once the drag ends, we unbind the mouse move function.
        }).one('mouseup', function(e){
            frame.off('mousemove');
            return false;
        });
        return false;
    }