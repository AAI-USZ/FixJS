function(jQuerySelection) {
       // console.log("adding droppability to", jQuerySelection);
       console.log(jQuerySelection);
        if (jQuerySelection != null){
                $(jQuerySelection).droppable({
                        //accept: "table",
                        hoverClass:"highlight",
                        tolerance:"touch",
                        over:function(event,ui){
                             //   console.log($(this));
                        },
                        drop: function(event, ui){
                                if($(this).children().length === 0){
        //                              carrying=$('<table>').html(ui.draggable.html())
                                       // console.log(carrying);
                                        //addDraggingFeature($(carrying));
                                        //$(carrying).draggable({
                                        //        connectToSortable: "#List",
                                        //        helper: "clone"
                                        // });
                                        $(this).html(carrying);
                                        addDraggingFeature($(this).find("table"))
                                        $(this).css("border", "none");
                                        addDroppableFeature($(carrying).find('.droppable'));
                                        ui.helper.hide();
                                        ui.draggable.remove();
                                }
                        }
                });
        }
}