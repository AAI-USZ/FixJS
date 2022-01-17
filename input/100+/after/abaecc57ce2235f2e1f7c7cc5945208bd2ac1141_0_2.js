function(event){
		if (scene === "start"){
			if (event.which === playerObj[0].controls.bomb){
				draw("credits");
			}
		}
		else if (scene === "credits"){
			if (event.which === playerObj[0].controls.bomb){
				draw("menu");
			}
		}
		else if (scene === "menu"){
			if (event.which == playerObj[0].controls.bomb){ //enter
				active_position=0;
				generatePlayerobj(config.menu[1].value);
				draw("playerChoice");
			}
			else if (event.which == playerObj[0].controls.left){ //left
				if (active_position > 1){
					config.menu[active_position].value = toggle(config.menu[active_position].value);
				}
				else{
					if (config.menu[active_position].value > config.menu[active_position].min){
						config.menu[active_position].value--;
					}
					else{
						config.menu[active_position].value = config.menu[active_position].max;
					}
				}
				draw("menu");
			}
			else if (event.which == playerObj[0].controls.up){ //up
				if (active_position >0){
					active_position--;
				}
				draw("menu");
			}
			else if (event.which == playerObj[0].controls.right){ //right
				if (active_position > 1){
					config.menu[active_position].value = toggle(config.menu[active_position].value);
				}
				else{
					if (config.menu[active_position].value < config.menu[active_position].max){
						config.menu[active_position].value++;
					}
					else{
						config.menu[active_position].value = config.menu[active_position].min;
					}
				}
				draw("menu");
			}
			else if (event.which == playerObj[0].controls.down){ //down
				if (active_position <config.menu.length-1){
					active_position++;
				}
				draw("menu");
			}
		}
		else if (scene === "playerChoice"){
			if (event.which == playerObj[0].controls.left){ //left
				//Mark the current sprite as available;
				config.player[playerObj[active_position].spriteposition].taken = false;
				do{
					if(playerObj[active_position].spriteposition === 0){
						playerObj[active_position].spriteposition = config.player.length - 1;
					}
					else{
						playerObj[active_position].spriteposition--;
					}
				}
				while (config.player[playerObj[active_position].spriteposition].taken===true);
			
				playerObj[active_position].username = config.player[playerObj[active_position].spriteposition].name;
				config.player[playerObj[active_position].spriteposition].taken = true;
				draw("playerChoice");
			}
			else if (event.which == playerObj[0].controls.up){ //up
				if (active_position >0){
					active_position--;
				}
				draw("playerChoice");
			}
			else if (event.which == playerObj[0].controls.right){ //right
				//Mark the current sprite as available;
				config.player[playerObj[active_position].spriteposition].taken = false;
				do{
					playerObj[active_position].spriteposition = (playerObj[active_position].spriteposition + 1) % config.player.length;
				}
				while (config.player[playerObj[active_position].spriteposition].taken===true);
			
				playerObj[active_position].username = config.player[playerObj[active_position].spriteposition].name;
				config.player[playerObj[active_position].spriteposition].taken = true;
				draw("playerChoice");
			}
			else if (event.which == playerObj[0].controls.down){ //down
				if (active_position < playerObj.length-1){
					active_position++;
				}
				draw("playerChoice");
			}
			else if (event.which == playerObj[0].controls.bomb){ //enter
				//console.log("startGame");
				draw("countdown");
			};
		}
		else if(scene==="hallOfFame"){
			if (event.which == playerObj[0].controls.bomb){ //enter
				if (gameEnds()){
					resetArray();
					console.log("ende");
					console.log("resetVariables");
					draw("menu");
				}
				else{
					console.log("nextRound");
					drawShop(getNextActivePlayer(0));
				}
			};
		}
		else if (scene==="shop"){
			if (event.which === playerObj[active_player].controls.bomb){ //enter
				if (active_position<config.buyableExtras.length){
					if (playerObj[active_player].money >= config.buyableExtras[active_position].prize){
						playerObj[active_player].money = playerObj[active_player].money - config.buyableExtras[active_position].prize;
						if (config.buyableExtras[active_position].name==="EXTRA BOMB"){
							playerObj[active_player].maxBombs++;
						}
						else if (config.buyableExtras[active_position].name==="POWER-UP"){
							playerObj[active_player].fireRange++;
						}
						else if (config.buyableExtras[active_position].name==="TIMEBOMB"){
							playerObj[active_player].timeBomb = true;
						}
						else if (config.buyableExtras[active_position].name==="POWER-UP"){
							playerObj[active_player].invinsible = true;
						}
						else if (config.buyableExtras[active_position].name==="SPEED-UP"){
							playerObj[active_player].speed = playerObj[active_player].speed + 0.5;
						}
						console.log("geld reicht");
						//drawShop(active_player);
					}
					if(playerObj[active_player].money === 0){
						console.log("not enough");
						active_player++;
						//playSound("burb");
						//drawShop(active_player);
					}
				}
				else{
					console.log("exit");
					if (active_player < playerObj.length-1){
						active_player++;
						//console.log(getNextActivePlayer(active_player));
						drawShop(getNextActivePlayer(active_player));
					}
					else{
						console.log("draw otherstuff");
						draw("countdown");
					}
				};
				//console.log("enter");
				drawShop(getNextActivePlayer(active_player));
			}
			else if (event.which === playerObj[active_player].controls.up){ //up
				if (active_position >0){
					active_position--;
				}
				console.log("up");
				drawShop(getNextActivePlayer(active_player));
			}
			else if (event.which === playerObj[active_player].controls.down){ //down
				if (active_position < config.buyableExtras.length){
					active_position++;
				}
				console.log("down");
				drawShop(getNextActivePlayer(active_player));
			}
		}
	}