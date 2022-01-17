function(){
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
                    });
                    // mousup event binding
                    note.mouseup(function(){
                        isClicking = false;
                        that.events.afterNote.fire(note);
                        lastClicked = {};
                    });
                    // mouse hover event binding
                    note.hover(function(){
                        if(isClicking){
                            that.events.afterNote.fire(lastClicked);
                            that.events.onNote.fire(note);
                        }
                        lastClicked = note;
                    });
                }); 
            }