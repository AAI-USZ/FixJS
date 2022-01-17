function(event, ui) {
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
                                historyarr.push(tempProgram);
                                future = [];
                                dropped = false;
                                programCarrying = null;
                                carrying = null;
                        }
                }