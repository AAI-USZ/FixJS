function(evt){
                    origX = evt.clientX;
                    origY = evt.clientY;

                    $(prevCssclass).each(function(){
                        $(this).data("origWidth", $(this).width());
                    });
                    $(thisCssclass).each(function(){
                        $(this).data("origWidth", $(this).width());
                    });

                    mouseDown = true;
                }