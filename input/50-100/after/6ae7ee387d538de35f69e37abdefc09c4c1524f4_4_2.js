function(_currentPageShown, putInEditMode) {
            // If the current page is in edit mode, we take it back
            // into view mode
            if (isInEditMode() && currentPageShown) {
                cancelEditPage();
            }
            // Check whether this page has already been loaded
            if (currentPageShown && !_currentPageShown.isVersionHistory) {
                pagesCache[currentPageShown.ref] = $.extend(true, {}, currentPageShown);
            }
            currentPageShown = pagesCache[_currentPageShown.ref] || _currentPageShown;
            // Don't cache in version history mode
            if (currentPageShown.isVersionHistory) {
                currentPageShown = _currentPageShown;
            }
            renderPage(currentPageShown);
            // Put the page into edit mode
            if (putInEditMode) {
                editPage();
            }
        }