function(note_group) {
    var note = {}
    for(var i=0; i<note_group.frets.length; i++) {
     note.string = note_group.string;
     note.fret = note_group.frets[i];
     drawNote(note);
    }
  }