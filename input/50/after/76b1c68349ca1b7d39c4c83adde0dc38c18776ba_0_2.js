function(event, ui){
                        programCarrying = makeCodeFromOptions($(this).text());
                        carrying = createBlock(programCarrying);
                        return carrying;
                }