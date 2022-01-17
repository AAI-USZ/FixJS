function() {

        //implements sortability for the program block
        $("#List").sortable({
                connectWith: "#trash, .droppable",
               // handle:$('li table:not(tr)'),
                start: function(event, ui){
                        if (ui.item === null){
                                throw new Error("sortable start: ui.item is undefined");
                        } else {
                                if (ui.item.is('li')){
                                        carrying = ui.item.html();
                                       // console.log($(carrying));
                                }
                        }

                     //   console.log(carrying);
                },
                stop: function(event, ui) {
                       // console.log(carrying);
                        if (carrying === null || ui.item === null){
                                throw new Error("sortable stop: carrying is undefined");
                        } else{
                                var replacement = $('<li>' + carrying + '</li>');
                           //     console.log(replacement.find(('.droppable')).not('ui-droppable'));
                                addDroppableFeature(replacement.find(('.droppable')));
                                replacement.children("table").removeClass("ui-draggable");
                                ui.item.replaceWith(replacement);
                         //       console.log($(replacement));
                                setLiWidth();
                                program[replacement.index()] = programCarrying;
                                programCarrying = null;
                                carrying = null;
                        }

                     //   console.log(carrying);
                },
                remove: function(event, ui){
                        $(ui.item).remove();
                      //  console.log(carrying);
                },
                receive:function(event,ui){
                        if(ui.item === null){
                                throw new Error ("sortable receive");
                        }else{
                                if (!ui.item.is('span.draggable')){
                                  //    console.log(ui.sender.parent().parent())
                                      ui.sender.parent().parent().attr('style','border:3px;'+
                                                                                "border-style:solid;"+
                                                                                "border-radius:5px;"+
                                                                                "height:30px;" +
                                                                                "width:40px;"+
                                                                                "border-color:grey");
                                      ui.sender.parent().parent().html('Exp');
                                     // ui.item.remove();
                                }
                        }

                      //  console.log(carrying);
                },
                tolerance:'pointer',
                cursor:'pointer',
                scroll:false
                //items:'li'
                //revert:'invalid'
        });


        //Exprs things draggable from the drawer to the code
        $('.draggable').draggable({
                helper: function(event, ui){
                        programCarrying = makeCodeFromOptions($(this).text());
                        carrying = createBlock(programCarrying);
                       // console.log(carrying);
                        return carrying;
                },
                connectToSortable: "#List"
        });

        //allows for deletion
        $("#trash").droppable({
                //accept: ".expr",
                tolerance:'touch',
                over:function(event, ui){
                        //console.log('over trash');
                },
                drop: function(event, ui){
                        $(ui.draggable).remove();
                }
        });
}