function(){
    // we get the frame div, append the canvas to it
    frame = $('#panelz').append(canvas);
    // and initialize the canvas with an array of lines containing the text from the textarea in the frame (which we detach). TODO In the far future we may have an edit mode which brings it back.
    canvas.create(frame.find('textarea').detach().text().split("\n"));

    // On mouse down within the frame we get ready for a mouse drag which will pan the canvas. On all of the events we need to bind here (mousedown, mousemove and mouseup) we return false, to make sure they do not propagate and, e.g., start selecting pieces of the page.
    frame.mousedown(function(e){

        // First we save the starting position of the mouse drag
        var startx = e.pageX;
        var starty = e.pageY;
        // and the starting position of the canvas.
        var o = canvas.offset();
        var l = o.left;
        var t = o.top;

        // Then we bind a function so that when the mouse moves we calculate how much it moved since the drag started and modify the top and left CSS properties of the canvas to move it along with the pointer.
        frame.mousemove(function(e){
            canvas.offset(posit(
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
    });

    // And now that we have basic paging defined, we forward the story to the current location.
    while(canvas.idx < bookmark) canvas.forward();

// Other than dragging to pan, all the interface is currently keyboard driven, so when a key is pressed we check if it's a known command.
}