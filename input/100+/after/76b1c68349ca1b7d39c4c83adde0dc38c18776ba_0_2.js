function(jQuerySelection) {
       // console.log("adding droppability to", jQuerySelection);
                $(jQuerySelection).droppable({
//              accept: "table",
                hoverClass:"highlight",
                tolerance:"touch",
                drop: function(event, ui){
                        if($(this).children().length===0){
//                              carrying=$('<table>').html(ui.draggable.html())
                                carrying.draggable({
                                        connectToSortable: "#List"
                                       // helper: "clone"
                                });
                                $(this).html(carrying);
                                ui.helper.hide();
                                ui.draggable.remove();
                        }
                }
        });
}