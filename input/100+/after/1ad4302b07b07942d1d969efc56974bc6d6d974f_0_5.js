function(){
            if (prevColumn == null){
                prevColumn = this;
                return true;
            }

            var column = this;

            if ('resizer' in column && column['resizer']){
                prevColumn = column;
                return true; // this column already has a resizer, ignore
            }

            var thisCssclass = "."+dt.cls(dt.uri_to_cssclass(column['uri']));
            var prevCssclass = "."+dt.cls(dt.uri_to_cssclass(prevColumn['uri']));
            $(prevCssclass).each(function(){
                var cell = $(this);
                var sizer = dt.makediv(["sizer"]);
                sizer.insertAfter(cell);

                var sizer_width = sizer.width();
                cell.css("width", cell.width() - sizer_width);

                // FIXME duped below
                var row_height = sizer.parent().height();
                sizer.css("height", row_height);
                sizer.css("min-height", row_height);

                // TODO add draggable/resize operation
                var mouseDown = false;
                var origX = 0;
                var origY = 0;
                sizer.mousedown(function(evt){
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
                });
                $(document).mouseup(function(evt){
                    // re-enable text selection while dragging
                    document.onselectstart = function(){ return true; }

                    mouseDown = false;
                });
                $(document).mousemove(function(evt){
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
                });
            });
            column['resizer'] = true;
            prevColumn = column;
        }