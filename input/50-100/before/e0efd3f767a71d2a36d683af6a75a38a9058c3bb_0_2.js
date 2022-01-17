function(clss, text){

            // The chunk is a jquery div which we add to the panel
            var c = $('<div class="' + clss + '">' + text + '</div>').appendTo(p);
            // with a reference to its containing panel
            c.panel = p;
            // and the chunk that preceded it.
            c.prev = p.cur;

            // We tell the containing panel to reposition itself. TODO This should probably be propageted to a chain of buoy panels.
            p.place();

            // And all that remains it to set the new panel as the current chunk and return it.
            p.cur = c;
            return c;
        }