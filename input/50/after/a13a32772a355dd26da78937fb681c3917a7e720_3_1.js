function(callback)
    {  
        this._scriptSnippetModel._setScriptSnippetContent(this, this.workingCopy());
        callback(null);
    }