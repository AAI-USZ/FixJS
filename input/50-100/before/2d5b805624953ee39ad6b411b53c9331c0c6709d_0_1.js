function() {
    $("#playlist_form #playlistitem_set-group .module.table.dynamic-form").sortable({
        items: "div.tbody.dynamic-form",
        placeholder: "ui-state-highlight",
        stop: playlistitem_set_sorting
    });
    $("#playlistitem_set-group .module.table.dynamic-form" ).disableSelection();
    $("#playlist_form #playlistitem_set-group [name$='video']").live("change", playlistitem_set_sorting);
    $("#playlist_form #playlistitem_set-group .remove-handler").live("click", playlistitem_set_sorting);
}