function(evt){
                    origX = evt.clientX;
                    origY = evt.clientY;

                    $(prevCssclass).each(function(){
                        $(this).data("origWidth", $(this).width());
                    });
                    $(thisCssclass).each(function(){
                        $(this).data("origWidth", $(this).width());
                    });

                    // disable text selection while dragging
                    document.onselectstart = function(){ return false; }

                    mouseDown = true;
                }