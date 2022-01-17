function(code) {
        var showBookmarksDialog = this.prefs.getBoolPref('showBookmarksDialog'),
            bookmarkURI = Services.io.newURI(code, null, null),
            folderId = this.getStorageFolder(),
            bookmarkTitle = this.getBookmarkTitle(content.document.title);
        if (showBookmarksDialog) {
            var folder = new InsertionPoint(folderId, PlacesUtils.bookmarks.DEFAULT_INDEX, Ci.nsITreeView.DROP_ON);
            PlacesUIUtils.showBookmarkDialog({
                action: 'add',
                type: 'bookmark',
                uri: bookmarkURI,
                defaultInsertionPoint: folder,
                title: bookmarkTitle,
                hiddenRows: ['description' , 'location' , 'loadInSidebar' , 'keyword']
            }, window);
        } else {
            PlacesUtils.bookmarks.insertBookmark(
                folderId, // The id of the folder the bookmark will be placed in.
                bookmarkURI,             // The URI of the bookmark - an nsIURI object.
                PlacesUtils.bookmarks.DEFAULT_INDEX, // The position of the bookmark in its parent folder.
                bookmarkTitle
            );
        }
    }