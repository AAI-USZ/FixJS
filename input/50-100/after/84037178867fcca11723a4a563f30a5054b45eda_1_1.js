function draw(ctx){
    	var pt = this.containsPoint(mouseX, mouseY);
        drawbutton(ctx, x, y, w, h, pt);
        //we should put the text in the drawbutton function
        ctx.fillStyle = 'black';
        ctx.font = '14pt PressStart2PRegular';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w/2+10, y + 35, w - 20);
    }