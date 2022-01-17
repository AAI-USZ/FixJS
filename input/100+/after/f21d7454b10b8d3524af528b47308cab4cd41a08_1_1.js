function doFindSearchMatches(query)
        {
            this._currentSearchResultIndex = -1;
            this._searchResults = [];

            var regex = WebInspector.SourceFrame.createSearchRegex(query);
            this._searchResults = this._collectRegexMatches(regex);
            var selection = this._textEditor.lastSelection();
            for (var i = 0; selection && i < this._searchResults.length; ++i) {
                if (this._searchResults[i].compareTo(selection) > 0) {
                    this._currentSearchResultIndex = i - 1;
                    break;
                }
            }

            callback(this, this._searchResults.length);
        }