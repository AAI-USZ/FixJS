function(event) {
            event.preventDefault();

            // on mousedown, calculate the initial offset from the mouse position to the protractor center
            var startpt = graph.unscalePoint([event.pageX - $(graph.raphael.canvas.parentNode).offset().left,
                                              event.pageY - $(graph.raphael.canvas.parentNode).offset().top]);
            var offsetvec = [pro.center[0] - startpt[0], pro.center[1] - startpt[1]];

            $(document).bind("vmousemove", function(event) {
                // when moved, calculate the new offset as mousepos + offset, and move there
                var mousept = graph.unscalePoint([event.pageX - $(graph.raphael.canvas.parentNode).offset().left,
                                                  event.pageY - $(graph.raphael.canvas.parentNode).offset().top]);

                pro.move([mousept[0] + offsetvec[0], mousept[1] + offsetvec[1]]);
            });

            $(document).one("vmouseup", function(event) {
                $(document).unbind("vmousemove");
            });
        }