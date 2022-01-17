function(){
        this._dbSearch = new dictsearch.DBSearch ();
        this._candidateSelections = {};
        this._phoneticCache = {};
        this._loadCandidateSelectionsFromFile();
    }