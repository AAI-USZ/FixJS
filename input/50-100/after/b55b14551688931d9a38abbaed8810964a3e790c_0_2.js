function(event,ui){
                        if(ui.item === null){
                                throw new Error ("sortable receive");
                        }else{
                        console.log("received");
                                if (!ui.item.is('span.draggable')){
                                        eliminateBorder(ui.sender.parent().parent());
                                }
                        }
                }