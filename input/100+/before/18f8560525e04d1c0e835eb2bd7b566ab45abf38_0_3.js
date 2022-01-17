function drawGame(){
    resize();
	frame += 1;
	clear();
	world.draw();
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});
	
	ctx.drawImage(character, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(brown_pants, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(eypatch, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(bandana, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	ctx.drawImage(sword, characterInfo.sx, characterInfo.sy, characterInfo.w, characterInfo.h, WIDTH/2, HEIGHT/2, characterInfo.w, characterInfo.h);
	
	world.drawtop()
	
	if(move.up && world.findCharTile(0, characterInfo.speed, true)){
		characterInfo.sy = 0;
		characterInfo.y -= characterInfo.speed;
	}else if(move.up){
		characterInfo.sy = 0;
	}else if(move.left && world.findCharTile(characterInfo.speed, 0, true)){
		characterInfo.sy = 64;
		characterInfo.x -= characterInfo.speed;
	}else if(move.left){
		characterInfo.sy = 64;
	}else if(move.down && world.findCharTile(0, -characterInfo.speed, true)){
		characterInfo.sy = 128;
		characterInfo.y += characterInfo.speed;
	}else if(move.down){
		characterInfo.sy = 128;
	}else if(move.right && world.findCharTile(-characterInfo.speed, 0, true)){
		characterInfo.sy = 192;
		characterInfo.x += characterInfo.speed;
	}else if(move.right){
		characterInfo.sy = 192;
	}
	
	if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right)){
		characterInfo.sx += 64;
	}
	
	if (characterInfo.sx === 576){
		characterInfo.sx = 64;
	}
	
	if(move.up=== false && move.left === false && move.down === false && move.right === false){
		characterInfo.sx = 0;
	}
	gameLoop = requestAnimationFrame(drawGame);
}