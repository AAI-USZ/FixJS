function( msgText, author, parentThread) {
        this.msgText = msgText;
        this.author = author;

        if (parentThread){
            this._setParentID(parentThread.id);
            this._setParents(parentThread.parents);
        } else {
            this.parentID = null;
            this.parents = [];
        }
        this.child = []; // Threads
    }