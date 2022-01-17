function(){
        var div = $('dd[id="sp_criteria-element"]').children('div:visible:last').next(),
            add_button = $(this);
        
        div.show();
        div.find('a[id^="criteria_remove"]').after(add_button);
        div.children().removeAttr('disabled');
        div = div.next();
        if (div.length === 0) {
            $(this).hide();
        }
    }