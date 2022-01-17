function(){

        // Get the next line in the story
        var line = story[++canvas.idx];

        // New panel
        if('undefined' !== typeof line.dir){
            canvas.panel(line);

        // New chunk
        }else{
            canvas.cur.chunk(line);
        }

        // Draw if needed, otherwise advance story
        if(false !== line.draw){
            canvas.draw();
            if(line.eff){
                if('center' === line.eff[0]) canvas.center();
                else if('pan' === line.eff[0]) canvas.pan(line.eff[1], line.eff[2]);
            }
        }else{
            canvas.forward();
        }
    }