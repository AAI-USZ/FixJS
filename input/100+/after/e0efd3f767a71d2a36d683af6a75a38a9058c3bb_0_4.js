function(){
    // we get the frame div, append the Canvas to it
    frame = $('#panelz').append(Canvas);
    // and initialize the Story with an array of lines containing the text from the textarea in the frame (which we detach). TODO In the far future we may have an edit mode which brings it back.
    Story.lines = frame.find('textarea').detach().text().split("\n");

    // On mouse down within the frame we get ready for a mouse drag which will pan the Canvas. On all of the events we need to bind here (mousedown, mousemove and mouseup) we return false, to make sure they do not propagate and, e.g., start selecting pieces of the page.
    frame.mousedown(function(e){

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
    });

    // And now that we have basic paging defined, we forward the story to a bookmark, so we don't have to page from the beginning every time. TODO In the future, this value will be taken from a cookie, or the cursor position in the textarea. Maybe it will even get its own global object.
    while(Canvas.bookmark < 0) Canvas.forward();

// Other than dragging to pan, all the interface is currently keyboard driven, so when a key is pressed we check if it's a known command.
}