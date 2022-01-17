function(){
        return {
            msgText: this.msgText,
            author: this.author,
            id: this.id,
            childCount: this.getChildCount(),
            child: this.child
        };
    }