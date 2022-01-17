function appendAddButton() {
    var add_button = "<a class='ui-button sp-ui-button-icon-only criteria_add'>" +
                     "<span class='ui-icon ui-icon-plusthick'></span></a>";

    var sets = $('fieldset[id^=sp_set]');
    
    sets.each(function(index, ele){
        var set = $(ele);
        set.find('.criteria_add').remove();
        
        if (set.find('select[name^="sp_criteria_field"]:enabled').length > 1) {
            set.find('select[name^="sp_criteria_field"]:enabled:last')
                .siblings('a[id^="criteria_remove"]')
                .after(add_button);
        } else {
            set.find('select[name^="sp_criteria_field"]:enabled')
                .siblings('span[id="extra_criteria"]')
                .after(add_button);
        }
    });
}