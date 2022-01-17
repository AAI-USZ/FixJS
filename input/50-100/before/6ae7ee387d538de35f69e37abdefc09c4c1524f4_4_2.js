function(_currentPageShown, putInEditMode) {
            // If the current page is in edit mode, we take it back
            // into view mode
            if (isInEditMode() && currentPageShown) {
                cancelEditPage();
            }
            // Check whether this page has already been loaded
            if (currentPageShown) {
                pagesCache[currentPageShown.ref] = $.extend(true, {}, currentPageShown);
            }
            currentPageShown = pagesCache[_currentPageShown.ref] || _currentPageShown;
            renderPage(currentPageShown);
            // Put the page into edit mode
            if (putInEditMode) {
                editPage();
            }
        }