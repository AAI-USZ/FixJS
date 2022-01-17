function finishedCallback(view, searchMatches)
        {
            if (!searchMatches)
                return;

            WebInspector.searchController.updateSearchMatchesCount(searchMatches, this);
            view.jumpToFirstSearchResult();
            WebInspector.searchController.updateCurrentMatchIndex(view.currentSearchResultIndex, this);
        }