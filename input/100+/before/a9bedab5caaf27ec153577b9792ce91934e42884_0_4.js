function() {

        //implements sortability for the program block
        $("#List").sortable({
                connectWith: "#trash, .droppable",
               // handle:$('li table:not(tr)'),
                start: function(event, ui){
                        if (ui.item.is('li')){
                                carrying = ui.item.html();
                               // console.log($(carrying));
                        }

                     //   console.log(carrying);
                },

                stop: function(event, ui) {
                        var replacement = $('<li>' + carrying + '</li>');
                      //  console.log(replacement)
                        addDroppableFeature(replacement.find(('.droppable')).not('.ui-droppable'));
                        ui.item.replaceWith(replacement);
                        setLiWidth();
                        programCarrying = null;
                        carrying = null;

                     //   console.log(carrying);
                },
                remove: function(event, ui){

                        $(ui.item).remove();
                      //  console.log(carrying);
                },
                receive:function(event,ui){
                        if (!ui.item.is('span.draggable')){
                              ui.item.remove();
                        }

                      //  console.log(carrying);
                },
                tolerance:'pointer',
                cursor:'pointer',
                scroll:false,
                items:'li'
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
                        console.log('over trash');
                },
                drop: function(event, ui){
                        $(ui.draggable).remove();
                }
        });
}