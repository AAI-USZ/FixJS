function(event, ui) {
                        var itemIndex;
                        if (ui.item.is('span.draggable')){
                                var replacement = $('<li>' + createBlock(dragCarrying) + '</li>');
                                addDroppableFeature(replacement.find('.droppable'));
                        ui.item.replaceWith(replacement);
                        program.splice(replacement.index(), 0, dragCarrying);
                        dragCarrying = null;
                        } else{
                                itemIndex = carrying.index();
                                carrying = null;
                                program.splice(itemIndex, 0, programCarrying);
                        }
                        programCarrying = null;
                        carrying = null;
                }