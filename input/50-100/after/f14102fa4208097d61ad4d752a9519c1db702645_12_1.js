function() {
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0,100)).toString();
        
        var newNote = Ext.create("OnNotes.model.Note", {
            id: "noteId",
            dateCreated: now,
            title: "",
            narrative: ""
        });
        
        this.activateNoteEditor(newNote);
    }