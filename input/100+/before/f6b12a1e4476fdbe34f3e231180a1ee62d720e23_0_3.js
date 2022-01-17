function drawGame(){
	frame += 1;
	ctx.save();
    resize();
	clear();
	var offsetX = WIDTH/2 - character.size.w/2;
	var offsetY = HEIGHT/2 - character.size.h/2;
	ctx.translate(-character.position.x + offsetX, -character.position.y + offsetY);
	world.draw(ctx);
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
	NPCs.forEach(function(NPC){
		NPC.useAI();
		NPC.draw(ctx);
	});
	character.draw(ctx);
	world.drawtop(ctx);
    ctx.restore();
    if(dialogdirectionY === 'up'){
     if(dialogY < 240){
         dialogY += 5;
     }
    }else if(dialogdirectionY === 'down'){
     if(dialogY > -240){
         dialogY -= 5;
     }
    }
        if(dialogtext.length != futuredialogtext.length){
         var t = futuredialogtext.split('');
         dialogtext += t[(dialogtext.length)];
        }
        var box = UIBox('     ' + character.name, 180, 40, 350, 120).draw(ctx);
    ctx.beginPath();
    ctx.arc(140, 140, 125, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fill();
        var dialog_box = UIBox(dialogtext, 5, HEIGHT - dialogY, WIDTH-10, 240).draw(ctx);
        var next_button = UIButton('next', WIDTH-300, HEIGHT - dialogY + 180, 180, 50).draw(ctx);
	gameLoop = requestAnimationFrame(drawGame);
}