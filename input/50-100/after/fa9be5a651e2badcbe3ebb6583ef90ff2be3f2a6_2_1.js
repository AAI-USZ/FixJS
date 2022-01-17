function(){
        // Switch triangle icon
        $('span',this).toggleClass('ui-icon-triangle-1-s ui-icon-triangle-1-n');

        // The selects boxes' div
        var list = $(this).parent().next();

        // If visible, hide it. Otherwise hide all lists and show this one.
        if (list.is(':visible')) list.fadeOut();
        else {
            $('.dd_lists', list.parent()).hide();
            list.fadeIn();
        }
        return false;
    }