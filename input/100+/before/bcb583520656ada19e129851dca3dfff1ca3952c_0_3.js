function(e) {
        var self            = this,
            dataTransfer    = (e.dataTransfer
                                ? e.dataTransfer
                                : e.originalEvent.dataTransfer);

        dataTransfer.dropEffect = (gDragging ? 'move' : 'copy');
        e.preventDefault();
    }