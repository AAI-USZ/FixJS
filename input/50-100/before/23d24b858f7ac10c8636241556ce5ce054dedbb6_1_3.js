function(e) {
        var self    = this,
            $tgt    = $(e.target);

        /*
        if (! $tgt.attr('droppable'))
        {
            $tgt = $tgt.parents('[droppable]:first'); 
        }
        // */
        if ( (! $tgt.attr('droppable'))  ||
             ($tgt.hasClass('dragging')) ||
             ($tgt.hasClass('drag-over')) )
        { return; }

        console.log("drag leave: tgt[", $tgt.attr('class'), "]");

        $tgt.removeClass('drag-over');

        e.preventDefault();
        e.stopPropagation();
        return false;
    }