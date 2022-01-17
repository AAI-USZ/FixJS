function(){
            var blackX = 0 - (that.model.keys.black.width / 2),
                prevNote,
                blackCount = 0;
            
            if (that.model.keys.white.notes[0] > that.model.keys.black.notes[0]){
                blackX = blackX - that.model.keys.white.width + (that.model.keys.black.width / 2);
            }
            // Draw White Keys
            for (i = 0; i < that.model.keys.white.notes.length; i+=1){
                if (that.model.keys.white.notes[0] > that.model.keys.black.notes[0]){
                    that.drawNote(that.model.keys.white, (i * that.model.keys.white.width) + that.model.keys.black.width / 2, 0, that.model.keys.white.notes[i]);
                }
                else{
                    that.drawNote(that.model.keys.white, i * that.model.keys.white.width, 0, that.model.keys.white.notes[i]);
                }
            }
            
            // Draw Black Keys
            for (i = that.model.firstNote; i < (that.model.octaves * that.model.octaveNotes) + that.model.firstNote; i+=1){
                //get width going
                
                // If the current key in the pattern is black then draw it!
                if (that.model.pattern[i%that.model.octaveNotes] === "black") {
                    blackX = blackX + that.model.keys.white.width; 
                    that.drawNote(that.model.keys.black, blackX, 0, that.model.keys.black.notes[blackCount]);
                    blackCount = blackCount + 1;
                }
                
                // If it is white, but the previous key was white, skip the key
                if (that.model.pattern[i%that.model.octaveNotes] === prevNote){
                    blackX = blackX + that.model.keys.white.width;
                }
                
                // Keep track of previous key
                prevNote = that.model.pattern[i%that.model.octaveNotes]
            }
        }