function(event, ui) {
                       // console.log(carrying);
                        if (carrying === null || ui.item === null){
                                throw new Error("sortable stop: carrying is undefined");
                        } else{
                            var replacement = $('<li>').append(carrying);
                           //     console.log(replacement.find(('.droppable')).not('ui-droppable'));
                                addDroppableFeature(replacement.find(('.droppable')));
                            replacement.children("table").draggable('destroy');
                                ui.item.replaceWith(replacement);
                         //       console.log($(replacement));
                                setLiWidth();
                                program[replacement.index()] = programCarrying;
                                programCarrying = null;
                                carrying = null;
                        }

                     //   console.log(carrying);
                }