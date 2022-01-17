function(event, ui){
                        history[history.length] = program;
                        $(ui.item).remove();
                        for(var i=0;i<program.length;i++){
                                if(program[i].id===$(ui.item).id){
                                        program.splice(i,1);
                                }
                        }
                        console.log(program +"asdfasdf \n");
                        console.log(history);

                }