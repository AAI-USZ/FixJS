function(action) {
        // this gives us a chance to wait for the node to load fully
        var waiting = dragging.length,
            f = function() {
                waiting--;
                if (waiting == 0) {
                    action(dragging);
                }
            };
        
        if (!this.search.active && dragging.length) {
            music.utils.each(dragging, function(i, e) {
                e.loadChildren(f);
            });
        } else {
            // this is fully loaded already
            f();
        }
    }