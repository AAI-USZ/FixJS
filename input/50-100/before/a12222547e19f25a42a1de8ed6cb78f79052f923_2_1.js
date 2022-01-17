function( msgText, author, parentThread) {
        this.msgText = msgText;
        this.author = author;

        if (parentThread){
            this.parentID = parentThread.id;
            this.parents = [];
            this.parents.push(parentThread.id.toString());
            this.parents = this.parents.concat(parentThread.parents);
        } else {
            this.parentID = null;
            this.parents = [];
        }
        this.child = []; // Threads
    }