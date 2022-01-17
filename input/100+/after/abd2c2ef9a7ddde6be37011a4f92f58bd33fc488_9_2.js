function(ctx, image, x, y, options) {
        
        ctx.globalAlpha = options.alpha || 1;
        ctx.globalCompositeOperation = options.composite;
        
        ctx.drawImage(image, x, y);
        
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
    }