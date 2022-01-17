function(evt){
                    if (mouseDown){
                        var xDiff = evt.clientX - origX;
                        var yDiff = evt.clientY - origY;
                       
                        // check for minimum width
                        var minWidth = null;
                        $(prevCssclass).each(function(){
                            var newWidth = $(this).data("origWidth") + xDiff;
                            if (minWidth == null || newWidth < minWidth){
                                minWidth = newWidth;
                            }
                        });
                        $(thisCssclass).each(function(){
                            var newWidth = $(this).data("origWidth") - xDiff;
                            if (minWidth == null || newWidth < minWidth){
                                minWidth = newWidth;
                            }
                        });

                        if (minWidth >= dt.min_col_width){
                            // if we won't make a column less than the minimum
                        
                            $(prevCssclass).each(function(){
                                $(this).css("width", $(this).data("origWidth") + xDiff); // more wider
                            });
                            // TODO make this so that all cells to the right move right, rather than just the neighbouring getting smaller
                            $(thisCssclass).each(function(){
                                $(this).css("width", $(this).data("origWidth") - xDiff); // less wide
                            });
                        }

                        dt.ensure_div_sizing();
                    }
                }