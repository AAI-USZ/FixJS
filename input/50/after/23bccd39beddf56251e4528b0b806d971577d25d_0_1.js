function(){
        while(canvas.buffer.length > 0){
            console.log('draw', canvas.buffer.shift());
        }
    }