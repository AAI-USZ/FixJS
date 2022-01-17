function(){
    
        
            
        var hl = hexgrid.hexlenght*gamedata.zoom;
        var a = hl*0.5
        var b = hl*0.8660254 //0.86602540378443864676372317075294
        
        var horisontalcount = (gamedata.gamewidth/hexgrid.hexWidth())+2;
        var verticalcount = gamedata.gameheight/hexgrid.hexHeight()+2;
        
        var canvas = window.graphics.getCanvas("hexgrid");
        graphics.clearCanvas("hexgrid");
        canvas.save();
        canvas.fillStyle   = hexgrid.hexlinecolor;
        canvas.strokeStyle = hexgrid.hexlinecolor;
        
        
        if (gamedata.zoom <= 0.8)
            canvas.strokeStyle = "rgba(255,255,255,0.16)";
        
        if (gamedata.zoom <= 0.7)
            canvas.strokeStyle = "rgba(255,255,255,0.13)";
        
        if (gamedata.zoom <= 0.6)
            canvas.strokeStyle = "rgba(255,255,255,0.1)";
        
        
            
        if (gamedata.zoom < 0.7)
            return;
        
        canvas.lineWidth = hexgrid.hexlinewidth;

            
        for (var v = 0; v<=verticalcount; v++){
            for (var h = 0 ; h<=horisontalcount;h++){
                
                var x, y;
                
                if ((v+gamedata.scroll.y)%2 == 0){
                    x = h*b*2;
                }else{
                    x = (h*b*2)-b;
                }
                
                y = v*hl*2-(a*v);

                x -= gamedata.scrollOffset.x+hexgrid.hexWidth();
                y -= gamedata.scrollOffset.y+hexgrid.hexHeight();
                
                if (v==0 && h == 0)
                    window.graphics.drawHexagon(canvas, x, y, hl, true, true, true);
                else if (v==0 && h != 0){
                    window.graphics.drawHexagon(canvas, x, y, hl, false, true, true);
                }else if ((v+gamedata.scroll.y)%2 == 0 && h == 0)
                    window.graphics.drawHexagon(canvas, x, y, hl, true, false, false);
                else if (v != 0 && (v+gamedata.scroll.y)%2 != 0 && h == 0){
                    window.graphics.drawHexagon(canvas, x, y, hl, true, true, false);
                }else{
                    window.graphics.drawHexagon(canvas, x, y, hl, false, false, false);
                }       
                
                
                    
                //canvas.font         = 'italic 12px sans-serif';
                //canvas.textBaseline = 'top';
                //canvas.fillText  ((h+gamedata.scroll["x"])+","+(v+gamedata.scroll["y"]), x+b, y+hl);
                
            }
            
            
        }
        
        canvas.restore();
        
    }