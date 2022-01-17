function(){
        var st = strangth.value || 5;
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        sk.sketch(imgData, st);
        ctx.putImageData(imgData, 0, 0);
    }