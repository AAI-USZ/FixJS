function(that) {
        that.bindEvents = function(){
            // Variables to keep track of currently pressed notes
            var lastClicked = {};
            var isClicking = false;
            
            // Get an Array of all notes on canvas
            that.notes = that.container.find(".note");
            
            // Iterate through each note
            that.notes.each(function(i,note){
                // Make sure the note element is set up properly
                note = $(note);
                // mousedown event binding
                note.mousedown(function(){
                    // For Keeping track
                    lastClicked = note;
                    isClicking = true;
                    
                    that.events.onNote.fire(note);                    
                    
                    // noteOn function (fire event?) !!! that.noteOn(note[0].id);
                    // if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                    //                        note.css('fill',keys.white.highlight);
                    //                    }
                    //                    else{
                    //                        note.css('fill',keys.black.highlight);
                    //                    }
                    
                });
                // mousup event binding
                note.mouseup(function(){
                    isClicking = false;
                    // that.noteOff(note[0].id);
                    // if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                    //                         note.css('fill',keys.white.fill);
                    //                     }
                    //                     else{
                    //                         note.css('fill',keys.black.fill);
                    //                     }
                    lastClicked = {};
                });
                // mouse hover event binding
                note.hover(function(){
                    if(isClicking){
                        // Turn off the last note played
                        // Set its fill back to what it was before (This is the reason the css stuff was moved to note on / off)
                        // Turn on  New Note
                        
                    }
                });
            });
            // that.events.onNote.addListener("that.piano.noteOn");
        };
    }