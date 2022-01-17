function(event, ui){
                        console.log(ui.sender);
                        var itemIndex = $(ui.item).index();
                        if (!ui.item.is('span.draggable')){
                                carrying = $(ui.item).children();
                        }
                }