function()
    {
        this.cancelPendingSave();
 
        if ("dirty" in this) {
            this.timestamp = new Date().getTime();
            delete this.dirty;
        }
 
        var note = this;
        db.transaction(function (tx)
        {
            tx.executeSql("UPDATE WebKitStickyNotes SET note = ?, timestamp = ?, left = ?, top = ?, zindex = ?, background = ?, width = ?, height = ? WHERE id = ?", [note.text, note.timestamp, note.left, note.top, note.zIndex, note.note.style.background, note.note.style.width, note.note.style.height, note.id]);
        });
    }