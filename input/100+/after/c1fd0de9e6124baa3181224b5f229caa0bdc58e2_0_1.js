function(){

    // We get the Frame div, append the Canvas to it
    Frame = $('#panelz').append(Canvas).
    // And bind the mouse down event within the Frame to enable mouse drag which will pan the Canvas. Note that we return false on all the related events (mousedown, mousemove and mouseup) to make sure they do not propagate and, e.g., select pieces of the page.
    mousedown(function(e){

        // First we save the starting position of the mouse drag and the starting position of the Canvas.
        var
            startx = e.pageX,
            starty = e.pageY,
            o = Canvas.offset(),
            l = o.left,
            t = o.top;

        // Then we bind a function so that when the mouse moves we calculate how much it moved since the drag started and modify the top and left CSS properties of the Canvas to move it along with the pointer.
        Frame.mousemove(function(e){
            Canvas.offset({
                left: l + (e.pageX - startx),
                top: t + (e.pageY - starty)
            });
            return false;

        // Once the drag ends, we unbind the mouse move function.
        }).one('mouseup', function(e){
            Frame.off('mousemove');
            return false;
        });
        return false;
    });

    // Then we initialize the Story.
    Story.lines =

        // We find and detach the textarea inside the Frame which contains the script (TODO In the far future we may have an edit mode which brings it back)
        Frame.find('textarea').detach().
        // and split its text into an array of lines.
        text().split("\n");

    // Lastly we forward the story to a hard coded bookmark, so we don't have to page from the beginning every time. TODO In the future, this value will be taken from a cookie, or the cursor position in the textarea. Maybe it will even get its own global object.
    for(var x = 0; x < 0; (x++)) Canvas.go(1);

// And we bind the keyboard driven interface.
}