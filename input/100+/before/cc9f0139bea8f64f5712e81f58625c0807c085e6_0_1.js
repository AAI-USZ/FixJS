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
                            $(thisCssclass).each(function(){
                                $(this).css("width", $(this).data("origWidth") - xDiff); // less wide
                            });
                        }

                        // ensure sizers are the right height now
                        $("."+dt.cls("sizer")).each(function(){
                            // FIXME duped above 
                            var highest = 0;
                            $(this).parent().find("."+dt.cls("cell")).each(function(){
                                var thisheight = $(this).height() + dt.get_extras(this);
                                if (thisheight > highest){
                                    highest = thisheight;
                                }
                            });

                            $(this).css("height", highest);
                            $(this).css("min-height", highest);
                        });
                    }
                }