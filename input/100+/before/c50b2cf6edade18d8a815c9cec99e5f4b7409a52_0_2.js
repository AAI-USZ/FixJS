function(i,note){
                // Make sure the note element is set up properly
                note = $(note);
                
                // mousedown event binding
                note.mousedown(function(){
                    // For Keeping track
                    lastClicked = note;
                    isClicking = true;
                    
                    // noteOn function (fire event?) !!! that.noteOn(note[0].id);
                    
                    if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                        note.css('fill',keys.white.highlight);
                    }
                    else{
                        note.css('fill',keys.black.highlight);
                    }
                    
                });
                // mousup event binding
                note.mouseup(function(){
                    isClicking = false;
                    // that.noteOff(note[0].id);
                    if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                        note.css('fill',keys.white.fill);
                    }
                    else{
                        note.css('fill',keys.black.fill);
                    }
                    lastClicked = {};
                });
                // mouse hover event binding
                note.hover(function(){
                    if(isClicking){
                        // Turn off the last note played
                        // that.noteOff(lastClicked[0].id);
                        // Set its fill back to what it was before (This is the reason the css stuff was moved to note on / off)
                        // if($.inArray(parseInt(lastClicked[0].id), whiteNotes) != -1){
                        //     lastClicked.css('fill',keys.white.fill);
                        // }
                        // else{
                        //     lastClicked.css('fill',keys.black.fill);
                        // }
                        // Turn on  New Note
                        // that.noteOn(note[0].id);
                        lastClicked = note;
                        // if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                        //     note.css('fill',keys.white.highlight);
                        // }
                        // else{
                        //     note.css('fill',keys.black.highlight);
                        // }
                    }
                });
            }