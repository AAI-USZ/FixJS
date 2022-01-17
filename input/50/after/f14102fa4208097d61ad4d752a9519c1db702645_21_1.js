function() {
        console.log("onSave");
        this.fireEvent("saveNoteCommand",this);
    }