function(event, ui){
                                if ($(this) === undefined){
                                        throw new Error ("addDraggingFeature start: $(this) is undefined");
                                } else {
                                        tempProgram = cloneProgram(program);
                                        draggedClone = $(this);
                                        programCarrying = searchForIndex($(this).attr("id"), program);
                                        carrying = getHTML($(this));
                                        setChildInProgram($(this).closest($("th")).closest($("table")).attr("id"), $(this).attr("id"), undefined);
                                }
                        }