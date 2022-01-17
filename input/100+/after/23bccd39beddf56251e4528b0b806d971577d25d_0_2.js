function(){

        // Get the next line in the story
        if('undefined' === typeof canvas.story[++canvas.idx]){
            console.log(text[canvas.idx]);
            canvas.story[canvas.idx] = parseLine(text[canvas.idx]);
        }
        var l = canvas.story[canvas.idx];

        // Buffer lines till it's time to draw
        if('draw' !== l.type){
            canvas.buffer.push(l);
            canvas.forward();
        }else{
            canvas.draw();
        }
    }