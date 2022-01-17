function(){ 
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.fillStyle= "#C0C0C0";
            context.fillRect(0,0,canvasWidth,canvasHeight);
        
            if(model != null){

                drawModel(POS3D.Model.transformFaces(model));
                
            }
        }