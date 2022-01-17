function(tag_name) {
    var tag_names = this.getSelectedTags();
    var idx = $.inArray(tag_name, tag_names);
    if (idx !== -1) {
        tag_names.splice(idx, 1)
    }
    this.setSelectedTags(tag_names);
}