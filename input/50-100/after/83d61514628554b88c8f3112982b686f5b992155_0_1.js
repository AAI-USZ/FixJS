function export_to_spreadsheet(mytype) {
    
    if(mytype) {
        values = $('#fmFilter').serializeArray();
        values = jQuery.param(values);
        window.location = sitelink + "ajax?" + values + '&export_format=' + mytype
    }
}