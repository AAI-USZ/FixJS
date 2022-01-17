function(splitWord){
        var words = [];
        
        this._logger(this._phoneticCache[splitWord['middle'].toLowerCase()]);
        
        if (this._phoneticCache[splitWord['middle'].toLowerCase()]){
            words = this._phoneticCache[splitWord['middle'].toLowerCase()].slice(0);
        } else {
            words = this._dbSearch.search(splitWord['middle']);
        }
        return words;
    }