function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);

        if (! dataTransfer) { return; }

        var $src    = $(e.target);
        if (! $src.attr('draggable'))
        {
            // Immediate propagate up to the top-level 'draggable'
            $src = $src.parents('[draggable]:first');
        }

        /*
        var $tags   = $src.parent().find( $src.prop('tagName') );
        console.log("drag start: src[ %s-%d.%s ]",
                    $src.prop('tagName'),
                    $tags.index($src),
                    $src.attr('class'));
        // */

        $src.addClass('dragging');
        gDragging  = $src;

        //dataTransfer.effectAllowed = 'move';
        dataTransfer.setData('text/html', $src.html());
        dataTransfer.setData('application/x-moz-node', $src[0]);
    }