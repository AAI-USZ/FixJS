function(event, ui){
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