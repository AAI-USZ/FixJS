function (tx) 
        {
            console.log(note.note.style);
            tx.executeSql("INSERT INTO WebKitStickyNotes (id, note, timestamp, left, top, zindex, background, width, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [note.id, note.text, note.timestamp, note.left, note.top, note.zIndex, note.note.style.background, note.note.style.width, note.note.style.height]);
        }