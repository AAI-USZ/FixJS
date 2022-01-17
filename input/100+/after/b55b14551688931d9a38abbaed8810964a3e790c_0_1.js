function() {

        //implements sortability for the program block
        $("#List").sortable({
                connectWith: "#trash, .droppable",
                placeholder:'placeholder',
                start: function(event, ui){
                        if (ui.item === null){
                                throw new Error("sortable start: ui.item is undefined");
                        } else {
                                if (ui.item.is('li')){
                                        tempProgram = cloneProgram(program);
                                        carrying = ui.item.html();
                                        var index = ui.item.index();
                                        programCarrying = program[index];
                                        program.splice(index, 1);
                                } 
                        }
                },
                stop: function(event, ui) {
                        if (carrying === null || ui.item === null){
                                throw new Error("sortable stop: carrying is undefined");
                        } else{
                                var replacement = $('<li>').append(carrying);
                                addDroppableFeature(replacement.find(('.droppable')));
                                ui.item.replaceWith(replacement);
                                setLiWidth();
                                if (programCarrying == undefined){
                                        throw new Error ("sortable stop: programCarrying is undefined/null");
                                }else if (!dropped){
                                        program.splice(replacement.index(), 0, programCarrying);
                                }
                                addToHistory(tempProgram);
                                dropped = false;
                                programCarrying = null;
                                carrying = null;
                        }
                },
                // remove: function(event, ui){

                //         console.log("removed");
                //         $(ui.item).detach();
                // },
                receive:function(event,ui){
                        if(ui.item === null){
                                throw new Error ("sortable receive");
                        }else{
                        console.log("received");
                                if (!ui.item.is('span.draggable')){
                                        eliminateBorder(ui.sender.parent().parent());
                                }
                        }
                },
                tolerance:'pointer',
                cursor:'pointer',
                scroll:false
        });


        //Exprs things draggable from the drawer to the code
        $('.draggable').draggable({
                start: function(event, ui) {
                        tempProgram = cloneProgram(program);
                },
                helper: function(event, ui){
                        programCarrying = makeCodeFromOptions($(this).text());
                        carrying = createBlock(programCarrying);
                        return carrying;
                },
                connectToSortable: "#List, #trash"
        });

        //allows for deletion
        $("#trash").droppable({
                tolerance:'touch',
                drop: function(event, ui){
                        console.log("in trash");
                        dropped = true;
                        if (draggedClone != undefined){
                                eliminateBorder(draggedClone.closest($("th")));
                                draggedClone = undefined;
                        }
                        $(ui.draggable).remove();
                        addToHistory(tempProgram);
                }
        });
}