function(event, ui) {
                        var itemIndex;
                        if (ui.item.is('span.draggable')){
                                var replacement = $('<li>' + carrying + '</li>');
                                addDroppableFeature(replacement.find('.droppable'));
                                ui.item.replaceWith(replacement);
                                itemIndex = replacement.index();
                        } else{
                                itemIndex = carrying.index();
                        }
                        programCarrying = null;
                        carrying = null;
                }