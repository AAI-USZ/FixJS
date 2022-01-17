function(splitWord){
        var words = [];
        words = this._dbSearch.search(splitWord['middle']);
        return words;
    }