function finishedCallback(view, searchMatches)
        {
            if (!searchMatches)
                return;

            WebInspector.searchController.updateSearchMatchesCount(searchMatches, this);
            view.jumpToNextSearchResult();
            WebInspector.searchController.updateCurrentMatchIndex(view.currentSearchResultIndex, this);
        }