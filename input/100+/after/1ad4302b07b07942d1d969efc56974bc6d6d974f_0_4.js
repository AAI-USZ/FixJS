function(evt){
                    // re-enable text selection while dragging
                    document.onselectstart = function(){ return true; }

                    mouseDown = false;
                }