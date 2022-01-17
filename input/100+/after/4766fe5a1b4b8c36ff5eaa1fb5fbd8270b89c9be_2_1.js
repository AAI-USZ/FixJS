function create(element) {
        // Init DOM element
        $openFilesContainer = element;
        $openFilesList = $openFilesContainer.find("ul");
        
        // Register listeners
        $(DocumentManager).on("workingSetAdd", function (event, addedFile) {
            _handleFileAdded(addedFile);
        });

        $(DocumentManager).on("workingSetAddList", function (event, addedFiles) {
            _handleFileListAdded(addedFiles);
        });

        $(DocumentManager).on("workingSetRemove", function (event, removedFile) {
            _handleFileRemoved(removedFile);
        });

        $(DocumentManager).on("workingSetRemoveList", function (event, removedFiles) {
            _handleRemoveList(removedFiles);
        });

        $(DocumentManager).on("dirtyFlagChange", function (event, doc) {
            _handleDirtyFlagChanged(doc);
        });
    
        $(FileViewController).on("documentSelectionFocusChange", function (event, eventTarget) {
            _handleDocumentSelectionChange();
            _fireSelectionChanged();
        });

        $(FileViewController).on("fileViewFocusChange", _updateListSelection);
        
        // Show scroller shadows when open-files-container scrolls
        ViewUtils.addScrollerShadow($openFilesContainer[0], null, true);
        ViewUtils.sidebarList($openFilesContainer);
        
        _redraw();
    }