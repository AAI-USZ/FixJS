function doFindSearchMatches(query)
        {
            this._currentSearchResultIndex = -1;
            this._searchResults = [];

            var regex = WebInspector.SourceFrame.createSearchRegex(query);
            this._searchResults = this._collectRegexMatches(regex);

            callback(this, this._searchResults.length);
        }