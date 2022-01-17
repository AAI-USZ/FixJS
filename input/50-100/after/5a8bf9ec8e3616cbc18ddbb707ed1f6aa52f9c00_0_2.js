function draw(ctx){
    	var pt = this.containsPoint(mouseX, mouseY);
        ctx.fillStyle = 'blue';
        roundRect(ctx, x, y, w, h, pt);
        ctx.fillStyle = 'white';
        ctx.font = '20pt Helvetica';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2, y + 30, w - 20);
    }