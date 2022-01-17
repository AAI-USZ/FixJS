function() {

    var theNotes = self.config.notes;
    for(var i=0; i<theNotes.length; i++) {
      if(theNotes[i].muted) {
        drawMuteStringAnnotatation(theNotes[i].string);
      } else if (theNotes[i].open) {
        drawOpenStringAnnotatation(theNotes[i].string);
      } else {
        if(theNotes[i].frets) {
          drawNoteGroup(theNotes[i]);
        } else {
          drawNote(theNotes[i]);
        }
        if (theNotes[i].finger) {
          drawFingerAnnotation(theNotes[i].string, theNotes[i].finger);
        }
      }
    }
  }