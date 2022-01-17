function(event, ui){
                        if (ui.item === null){
                                throw new Error("sortable start: ui.item is undefined");
                        } else {
                                if (ui.item.is('li')){
                                        carrying = ui.item.html();
                                       // console.log($(carrying));
                                }
                        }

                     //   console.log(carrying);
                }