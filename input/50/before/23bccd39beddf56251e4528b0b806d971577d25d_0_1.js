function(){
        while(canvas.buffer.length > 0) canvas.buffer.shift().add();
    }