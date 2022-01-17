function(event, ui) {
                        var replacement = $('<li>' + carrying + '</li>');
                      //  console.log(replacement)
                        addDroppableFeature(replacement.find(('.droppable')).not('.ui-droppable'));
                        ui.item.replaceWith(replacement);
                        setLiWidth();
                        programCarrying = null;
                        carrying = null;

                     //   console.log(carrying);
                }