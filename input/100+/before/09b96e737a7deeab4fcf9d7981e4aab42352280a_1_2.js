function(event, ui) {
        // Determine dimension
        var $target = $(event.target).hasClass('sprite') ?
            $(event.target).parent().find('.dimension') :
            $(event.target);
        var key = $target.attr('href').replace('#', '');
        
        // Launch selections dialog
        (new SelectionsModal({
            target: $target,
            name: $target.text(),
            key: key,
            workspace: this.workspace
        })).open();
        
        // Prevent default action
        try {
            event.preventDefault();
        } catch (e) { }
        return false;
    }