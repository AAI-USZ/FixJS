function(event, ui){
                        var itemIndex = $(ui.item).index();
                        carrying = $(ui.item).children();
                        console.log(carrying);
                        programCarrying = program[itemIndex];
                        program.splice(itemIndex, 1);
                }