function draw(ctx){
    	var pt = false;
    	if(this.containsPoint(mouseX, mouseY) === true){
    		pt = true;
    	}
        ctx.fillStyle = 'blue';
        roundRect(ctx, x, y, w, h, pt);
        ctx.fillStyle = 'white';
        ctx.font = '20pt Helvetica';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2, y + 30, w - 20);
    }