function export_extension_set_tableWrapperWidths() {
    export_extension_get_dimensions();
    $("#export_head,#xp").css("width",export_width);
    export_extension_set_TableWidths();
}