function(){
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
                    
                }