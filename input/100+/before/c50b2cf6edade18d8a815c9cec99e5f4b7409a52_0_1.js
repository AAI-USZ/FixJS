function(){
                    isClicking = false;
                    // that.noteOff(note[0].id);
                    if($.inArray(parseInt(note[0].id), whiteNotes) != -1){
                        note.css('fill',keys.white.fill);
                    }
                    else{
                        note.css('fill',keys.black.fill);
                    }
                    lastClicked = {};
                }