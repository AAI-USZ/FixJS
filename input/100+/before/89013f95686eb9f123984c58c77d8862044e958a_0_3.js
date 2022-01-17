function() {

    var notes = self.config.notes;
    for(var i=0; i<notes.length; i++) {
      if(notes[i].muted) {
        drawMuteStringAnnotatation(notes[i].string);
      } else if (notes[i].open) {
        drawOpenStringAnnotatation(notes[i].string);
      } else {
        drawNote(notes[i].string, notes[i].fret, notes[i].tonic);
        drawFingerAnnotation(notes[i].string, notes[i].finger);
      }
    }
  }