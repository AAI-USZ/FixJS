function() {
        // Pull the HTML from cache and hide all dimensions
        $(this.el).html(this.template)
            .find('.hide').hide().removeClass('hide');
        
        // Add draggable behavior
        $(this.el).find('.measure,.dimension').parent('li').draggable({
            cancel: '.not-draggable, .hierarchy',
            connectToSortable: $(this.workspace.el)
                .find('.columns > ul, .rows > ul, .filter > ul'),
            helper: 'clone',
            opacity: 0.60,
            tolerance: 'pointer',
            cursorAt: {
                top: 10,
                left: 35
            }
        });
    }