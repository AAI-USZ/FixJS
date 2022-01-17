function(e) {
        var action = $(this).data('action');
        if (!action) return;
        e.stopPropagation();
        e.preventDefault();
        switch (action) {
            case 'edit':
                editReview($(this).closest('.review'));
            break;
            case 'report':
                flagReview($(this).closest('.review'));
            break;
        }
    }