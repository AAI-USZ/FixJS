function(e){
            Canvas.offset(posit(
                    l + (e.pageX - startx),
                    t + (e.pageY - starty)
            ));
            return false;

        // Once the drag ends, we unbind the mouse move function.
        }