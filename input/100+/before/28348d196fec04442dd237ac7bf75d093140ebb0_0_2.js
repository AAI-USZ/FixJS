function(jQuerySelection) {
        if (jQuerySelection !== null){
                addDraggableToTable((jQuerySelection).find("table"));
                jQuerySelection.droppable({
                        hoverClass:"highlight",
                        tolerance:"pointer",
                        greedy:true,
                        drop: function(event, ui){
                                if ($(this) === undefined){
                                        throw new Error ("addDroppableFeature drop: $(this) is undefined");
                                } 
                                else if($(this).children().length === 0){
                                        $(this).html(carrying);
                                        setChildInProgram($(this).closest($("table")).attr("id"),$(this).attr("id"),programCarrying);
                                        addDroppableFeature($(this).find('.droppable'));
                                        addDraggableToTable($(this).find("table"));
                                        $(this).css("border", "none");
                                        ui.draggable.detach();
                                        droppedInDroppable = true;
                                }
                        }
                });
        }
}