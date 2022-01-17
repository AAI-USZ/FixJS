function drawGame(){
    resize();
	frame += 1;
	clear();
	world.draw();
	monsters.forEach(function(monster){
		monster.useAI();
		monster.draw(ctx);
	});

	character.draw(ctx);
	world.drawtop();
	
	// Move collision detection into the Character object
	if(move.up){
	    character.spriteOffset.y = 0; // face sprite up
	    if (!world.findCollision(0, character.speed)){
    		character.position.y -= character.speed;
	    }
	}else if(move.left){
	    character.spriteOffset.y = 64; // face sprite left
	    if (!world.findCollision(character.speed + 5, 0)){
		    character.position.x -= character.speed;
		}
	}else if(move.down){
	    character.spriteOffset.y = 128; // face sprite down
	    if (!world.findCollision(0, -character.speed - 64)){
		    character.position.y += character.speed;
		}
	}else if(move.right){
		character.spriteOffset.y = 192;
	    if(!world.findCollision(-character.speed - 40, 0)){
    		character.position.x += character.speed;
    	}
	}
	
	// Move this animation state into the Character object
	if((frame % 5 === 0) && (move.up|| move.left || move.down || move.right)){
		character.spriteOffset.x += 64;
	}
	
	if (character.spriteOffset.x === 576){
		character.spriteOffset.x = 64;
	}
	
	if(! (move.up || move.left || move.down || move.right )){
		character.spriteOffset.x = 0;
	}
	gameLoop = requestAnimationFrame(drawGame);
}