function loadMap(theTile) {
		
		Crafty("remove").each(function() {
			this.destroy();
		});
		
		var theTileC = theTile + "c";

		for(var k = 1; k <= player.hp.max; k++){
			hearts[k-1].attr({ x: (480 - (k * 34))-Crafty.viewport.x  , y: 3-Crafty.viewport.y});
		}
		
		if(theTile === tile4 || theTile === tile5){

			for(var i = 0; i < 15; i++){
				for(var j = 0; j < 10; j++) {
					Crafty.e("2D, DOM, remove, cavefloor" + Crafty.math.randomInt(1, 4))
						.attr({x: (i * 32)-Crafty.viewport.x, y: (j * 32)-Crafty.viewport.y, z:2});
				}
			}

			for(var i = 0; i < 95; i++) {	
					cavey[i] = Crafty.e("2D, DOM, solid, remove, cavewall" + Crafty.math.randomInt(1, 3));
			}

			for(var i = 0; i < 15; i++){
				for(var i = 0; i < 10; i++) {

					if(theTileC[j][i] === BUSH) {
						cavey[cCount].attr({x: (i * 32)-Crafty.viewport.x, y: (j * 32)-Crafty.viewport.y, z:2});
						cCount = cCount + 1;
					} else if(theTileC[j][i] === TLLAVA) {
							Crafty.e("2D, DOM, tllava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === LLAVA) {
							Crafty.e("2D, DOM, llava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === BLLAVA) {
							Crafty.e("2D, DOM, bllava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === TLAVA) {
							Crafty.e("2D, DOM, tlava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === LAVA) {
							Crafty.e("2D, DOM, lava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === BLAVA) {
							Crafty.e("2D, DOM, blava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === TRLAVA) {
							Crafty.e("2D, DOM, trlava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === RLAVA) {
							Crafty.e("2D, DOM, rlava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					} else if(theTileC[j][i] === BRLAVA) {
							Crafty.e("2D, DOM, brlava, remove, Collision,solid")
							.attr({x:(i * 32)-Crafty.viewport.x, 
								   y: (j * 32)-Crafty.viewport.y,
								   z:3});
					}
				}
			}
		}
		
		if(mspawn){
			
			for(var i = 0; i< 10; i++){
				mbars[i].attr({ x: 448-Crafty.viewport.x , y:103-(i*8)-Crafty.viewport.y});
			}
			
			bars[0].attr({x:480-34-Crafty.viewport.x,y:37-Crafty.viewport.y});
			bars[1].attr({x:480-34-Crafty.viewport.x,y:37+22-Crafty.viewport.y});
			bars[2].attr({x:480-34-Crafty.viewport.x,y:37+21+22-Crafty.viewport.y});
			bars[3].attr({x:480-34-Crafty.viewport.x,y:37+21+22+17-Crafty.viewport.y});
		} 
		
		for(var i = 0; i < 30; i++) {

			for(var j = 0; j < 20; j++) {
				
      			grassy[gCount].attr({x: (i * 16)-Crafty.viewport.x, y: (j * 16)-Crafty.viewport.y});
				gCount = gCount + 1;
				
				if (theTile[j][i] === BUSH && !(theTile === tile4 || theTile === tile5)) {
					bushy[bCount].attr({x: (i * 16)-Crafty.viewport.x, y: (j * 16)-Crafty.viewport.y, z:2});
					bCount = bCount + 1;
				}

				else if (theTile[j][i] === OBST) {
    				Crafty.e("2D, DOM, solid, remove, SpriteAnimation, stuff" + Crafty.math.randomInt(1, 4))
							.attr({x: (i * 16)-Crafty.viewport.x,
								   y: (j * 16)-Crafty.viewport.y,
								   z:2});
				}

				else if (theTile[j][i] === ENEMY) {
					Crafty.e("Enemy", "remove", "kill")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});
				} else if (theTile[j][i] === BOSS1 && !mspawn) {
					Crafty.e("Boss1", "remove", "kill")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});

				} else if (theTile[j][i] === BOSS2 && !bspawn) {
					Crafty.e("Boss2", "remove")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});

				}else if(theTile[j][i] === ARENEMY) {
					Crafty.e("AEnemy", "remove", "kill")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});
				}else if(theTile[j][i] === LRIVER) {
					Crafty.e("2D, DOM leriv, remove, Collision, solid")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});
				} else if(theTile[j][i] === CRIVER) {
					Crafty.e("2D, DOM, ceriv, remove, Collision,solid")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});
				} else if(theTile[j][i] === RRIVER) {
					Crafty.e("2D, DOM, ririv, remove, Collision,solid")
							.attr({x:(i * 16)-Crafty.viewport.x, 
								   y: (j * 16)-Crafty.viewport.y,
								   z:3});
				}  
			}
		}
		
		bCount = 0;
		gCount = 0;	
		cCount = 0;
	}