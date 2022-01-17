function draw(ctx){
		ctx.drawImage(UI.confirm_bg, 0, 0, 32, 32, x, y, 32, 32);
		ctx.drawImage(UI.confirm_bg, 160, 0, 32, 32, x+w-32, y, 32, 32);
		ctx.drawImage(UI.confirm_bg, 32, 0, 32, 32, x+32, y, w-64, 32);
		ctx.drawImage(UI.confirm_bg, 0, 32, 32, 32, x, y+h-32, 32, 32);
		ctx.drawImage(UI.confirm_bg, 160, 32, 32, 32, x+w-32, y+h-32, 32, 32);
		ctx.drawImage(UI.confirm_bg, 32, 32, 32, 32, x+32, y+h-32, w-64, 32);
		ctx.drawImage(UI.confirm_bg, 0, 16, 32, 32, x, y+32, 32, h-64);
		ctx.drawImage(UI.confirm_bg, 160, 16, 32, 32, x+w-32, y+32, 32, h-64);
		ctx.drawImage(UI.confirm_bg, 32, 16, 32, 32, x+32, y+32, w-64, h-64);
		ctx.fillStyle = '#fff';
        ctx.font = '10pt PressStart2PRegular';
        ctx.textAlign = 'left'
        ctx.fillText(text, x+20, y+35, WIDTH-20);
	}