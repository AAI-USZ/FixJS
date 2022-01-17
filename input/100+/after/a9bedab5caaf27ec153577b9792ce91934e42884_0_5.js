function(jQuerySelection) {
       // console.log("adding droppability to", jQuerySelection);
      // console.log(jQuerySelection);
        if (jQuerySelection !== null){
                //console.log("adding drop")
                $(jQuerySelection).droppable({
                        //accept: "table",
                        hoverClass:"highlight",
                        tolerance:"pointer",
                        over:function(event,ui){
                          // console.log($(this));
                        },
                        drop: function(event, ui){
                                console.log($(this));
                                if ($(this) === undefined){
                                        throw new Error ("addDroppableFeature drop: $(this) is undefined");
                                } else if($(this).children().length === 0){
        //                              carrying=$('<table>').html(ui.draggable.html())
                                       // console.log(carrying);
                                        //addDraggingFeature($(carrying));
                                        //$(carrying).draggable({
                                        //        connectToSortable: "#List",
                                        //        helper: "clone"
                                        // });
                                        $(this).html(carrying);
                                        addDraggingFeature($(this).find("table"));
                                        $(this).css("border", "none");
                                        addDroppableFeature($(this).find('.droppable'));
                                       // console.log($(this));
                                        //ui.helper.hide();
                                        ui.draggable.remove();
                                }
                        }
                });
        }
}