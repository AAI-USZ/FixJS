function(tag_name) {
    var tag_names = this.getSelectedTags();
    var idx = $.inArray(tag_name, tag_names);
    if (idx !== -1) {
        tag_names.splice(idx, 1)
        if (tag_names.length === 0) {
            this._prompt.show();
        }
    }
    this.setSelectedTags(tag_names);
}