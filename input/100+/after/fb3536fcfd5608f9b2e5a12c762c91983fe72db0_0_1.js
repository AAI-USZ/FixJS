function(event,ui){
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
                                    var ancestor = ui.sender.parent().parent();
                                    ancestor.children().detach();
                                    ancestor.append("Exp");
                                     // ui.item.remove();
                                }
                        }

                      //  console.log(carrying);
                }