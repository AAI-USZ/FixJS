function(event, ui){
                        dropped = true;
                        if (draggedClone != undefined){
                                eliminateBorder(draggedClone.closest($("th")));
                                draggedClone = undefined;
                        }
                        $(ui.draggable).remove();
                        addToHistory(tempProgram);
                }