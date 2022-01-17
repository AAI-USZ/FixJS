function(){
        $('span',this).toggleClass('ui-icon-triangle-1-s ui-icon-triangle-1-n');
        $(this).parent().next().toggle();
    }