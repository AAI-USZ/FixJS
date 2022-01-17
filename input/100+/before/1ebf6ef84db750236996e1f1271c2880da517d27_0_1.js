function refreshBG(){//{{{
        // redraw all the objects on the canvas
        with(draft.context){
            with(draft.canvas){
                var grad = createLinearGradient(0,0,0,height);
                grad.addColorStop(0,'rgb(0,0,200)');
                grad.addColorStop(1,'rgb(0,0,100)');
                fillStyle=grad;
                fillRect(0,0,width,height);
                lineCap = 'round';         

                if(draft.gridOptions["lines"]){//{{{
                    drawGrid = function (spacing){
                        beginPath();
                        for(var i=0; i< width; i+= spacing)
                        {
                            moveTo(i,0);
                            lineTo(i,height);
                        }
                        for(var i=0; i< height; i+= spacing)
                        {
                            moveTo(0,i);
                            lineTo(width,i);
                        }
                        stroke();
                    };
    
                    lineWidth=1;
                    strokeStyle = "rgb(100,100,100)";
                    drawGrid(40);
                    
                    lineWidth=2;
                    strokeStyle = "rgb(200,200,200)";
                    drawGrid(200);
                }//}}}

                if(draft.gridOptions["points"]){
                    lineWidth=2;
                    strokeStyle = "rgb(200,200,200)";
                    var spacing = 40;
                    var spacing2=200;
                    lineWidth = 2;
                    for(var x=0; x< width;  x+=spacing)
                    for(var y=0; y< height; y+=spacing)
                    {
                        beginPath();
                        if((x%spacing2==0) && (y%spacing2==0))
                            lineWidth= 7;
                        
                        moveTo(x-.5,y);
                        lineTo(x+.5,y);
                        stroke();
                        if((x%spacing2==0) && (y%spacing2==0))
                            lineWidth= 2;
                    }
                }
            }
            canvasBackground.src=canvas.toDataURL("image/png");
        }
    }//}}}