function drawGame(){
	frame += 1;
	resize();
	clear();
	ctx.save();
	var offsetX = WIDTH/2 - character.w/2;
	var offsetY = HEIGHT/2 - character.h/2;
	ctx.translate(Math.round(-character.x + offsetX), Math.round(-character.y + offsetY));
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
    if(daydirection === 1){
    	if(timeofday >= 0.5){
    		dayfunction();
    	}else{
    		timeofday += 0.00005;
    	}
    }else if(daydirection === 0){
    	if(timeofday <= 0.01){
    		dayfunction();
    	}else{
    		timeofday -= 0.00005;
    	}
    }
    ctx.fillStyle = 'rgba(0, 0, 0, ' + timeofday + ')';
    ctx.fillRect(0, 0 , WIDTH, HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fillText('FPS: ' + FPS, WIDTH-50, 10);
    ctx.save();
    ctx.translate(Math.round(-character.x + offsetX), Math.round(-character.y + offsetY));
    for(var i = 0; i < damagetext.length; i++){
		damagetext[i][1] -= 1;
		damagetext[i][6] -= 0.05;
		ctx.fillStyle = 'rgba(255, 0, 0, ' + damagetext[i][6] + ')';
		ctx.strokeStyle = 'rgba(0, 0, 0, ' + damagetext[i][6] + ')';
		ctx.strokeWidth = 1;
		ctx.strokeText(damagetext[i][4], damagetext[i][0], damagetext[i][1] - (damagetext[i][3]/2));
    	ctx.fillText(damagetext[i][4], damagetext[i][0], damagetext[i][1] - (damagetext[i][3]/2));
    	if(damagetext[i][6] <= 0){
			damagetext.splice(i, 1);
		}
    }
    ctx.restore();
    drawUI(ctx);
	gameLoop = requestAnimationFrame(drawGame);
}