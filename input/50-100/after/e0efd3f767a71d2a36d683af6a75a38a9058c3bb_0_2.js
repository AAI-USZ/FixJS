function(clss, text){

            // The chunk is a jquery div which we extend
            var c = $('<div class="' + clss + '"/>').text(text).extend({
                // with a reference to its containing panel
                panel: p,
                // and the chunk that preceded it,
                prev: p.cur
            // and append to the panel.
            }).appendTo(p);

            // Once the chunk has been appended, we tell the containing panel to reposition itself. TODO This should probably be propageted to a chain of buoy panels.
            p.place();

            // And all that remains it to set the new chunk as the current and return it.
            return (p.cur = c);
        }