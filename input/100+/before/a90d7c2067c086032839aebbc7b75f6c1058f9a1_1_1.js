function () {
        var curDoc = DocumentManager.getCurrentDocument();
        if (curDoc && _hasFileSelectionFocus()) {

            // Don't update the file tree selection to the current open doc when there is a directory
            // already selected
            var selected = getSelectedItem();
            if (selected && selected.isDirectory) {
                return;
            }

            $("#project-files-container li").is(function (index) {
                var entry = $(this).data("entry");
                if (entry && entry.fullPath === curDoc.file.fullPath && !_projectTree.jstree("is_selected", $(this))) {
                    //we don't want to trigger another selection change event, so manually deselect
                    //and select without sending out notifications
                    _projectTree.jstree("deselect_all");
                    _projectTree.jstree("select_node", $(this), false);
                    return true;
                }
                return false;
            });
        } else if (_projectTree !== null) {
            _projectTree.jstree("deselect_all");
            _lastSelected = null;
        }
        
        _redraw(true);
    }