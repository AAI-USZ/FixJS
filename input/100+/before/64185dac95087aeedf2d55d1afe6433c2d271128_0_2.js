function appendAddButton() {
    var rows = $('#smart-playlist-form');
    var add_button = "<a class='ui-button sp-ui-button-icon-only criteria_add'>" +
                     "<span class='ui-icon ui-icon-plusthick'></span></a>";

    rows.find('.criteria_add').remove();
    
    if (rows.find('select[name^="sp_criteria_field"]:enabled').length > 1) {
        rows.find('select[name^="sp_criteria_field"]:enabled:last')
            .siblings('a[id^="criteria_remove"]')
            .after(add_button);
    } else {
        rows.find('select[name^="sp_criteria_field"]:enabled')
            .siblings('span[id="extra_criteria"]')
            .after(add_button);
    }
}