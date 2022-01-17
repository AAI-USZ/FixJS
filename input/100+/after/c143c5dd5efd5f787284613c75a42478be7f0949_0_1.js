function draw(x){
		scene=x;
		if (scene === "start"){
			ctx.drawImage(startScreen,0,0,608,480);
		}
		if (scene === "credits"){
			ctx.clearRect (0, 0, canv.width, canv.height);
			ctx.drawImage(creditsScreen,0,0,608,480);
		}
		if (scene === "menu"){
			var y_line=1;
			ctx.clearRect (0, 0, canv.width, canv.height);	
			for(var i=0;i<config.menu.length; i++){
				if (y_line == 1){
					ctx.fillStyle = "blue";
					ctx.fillText ("MAIN MENU", 220, 35*y_line);
					y_line++;
					ctx.fillText ("---------", 220, 35*y_line);			
					y_line++;
				}
				if (active_position===i){
					ctx.fillStyle = "red";
					ctx.fillText (" > ", 70, 35*y_line);
				};
				ctx.fillStyle = "blue";
				ctx.fillText (config.menu[i].text, 120, 35*y_line); 	
				ctx.fillText (": " + config.menu[i].value, 380, 35*y_line); 
				y_line++;
			}
		}
		if (scene === "playerChoice"){
			//sprites for players
			var y_line=1;
			ctx.clearRect (0, 0, canv.width, canv.height);
					
			for(var i=0;i<playerObj.length; i++){
				if (y_line == 1){
					ctx.fillStyle = "blue";
					ctx.fillText ("CHOOSE PLAYER", 200, 35*y_line);
					y_line++;
					ctx.fillText ("---------", 230, 35*y_line);			
					y_line++;
				}
				if (active_position===i){
					ctx.fillStyle = "red";
					ctx.fillText (" > ", 70, 45*y_line);
				};
				ctx.fillStyle = "blue";
				ctx.fillText ("PLAYER " + (i+1), 120, 45*y_line);
				//ctx.fillText (": ", 300, 45*y_line);
				for(var k=0; k<config.player.length; k++){
					if (playerObj[i].username===config.player[k].name){
						ctx.drawImage(players,config.player[k].sx,config.player[k].sy,config.player[k].sw,config.player[k].sh,320,38*y_line,config.player[k].sw,config.player[k].sh);
					}
				}
				y_line++;
			}
			//console.log("PlayerConfig")
		}
		if (scene === "shop"){
			//drawShop(getNextActivePlayer(0));
		}
		if (scene === "countdown"){
			countDown();
		}
		if (scene === "game"){
			cntdown=3;
			console.log("draw game");
			$("#cr-stage").css("display","block");
			$("#myCanvas").css("display","none");
			scene="game";
			var myGameObj = jQuery.extend(true,[], playerObj);
			startGame(myGameObj, that);
			//sprites for players
		}
		if (scene === "hallOfFame"){
			$("#cr-stage").css("display","none");
			$("#myCanvas").css("display","block");
			ctx.clearRect (0, 0, canv.width, canv.height);
			var y_line=1;
					
			for(var i=0;i<playerObj.length; i++){
				if (y_line == 1){
					ctx.fillStyle = "blue";
					ctx.fillText ("HALL OF FAME", 200, 35*y_line);
					y_line++;
					ctx.fillText ("---------", 220, 35*y_line);
					y_line++;
				}
				for(var k=0; k<config.player.length; k++){
					if (playerObj[i].username===config.player[k].name){
						ctx.drawImage(players,config.player[k].sx,config.player[k].sy,config.player[k].sw,config.player[k].sh,160,40*y_line,config.player[k].sw,config.player[k].sh);
					}
					if (playerObj[i].wins > 0){
						for (var j=0; j < playerObj[i].wins; j++){
							//console.log(config.environmentExtras[0]);
							ctx.drawImage(extras, config.environmentExtras[0].sx,config.environmentExtras[0].sy,config.environmentExtras[0].sw,config.environmentExtras[0].sh,220+(j*32),41*y_line,config.environmentExtras[0].sw,config.environmentExtras[0].sh);
							//ctx.fillText ("t", 300+(j*32), 45*y_line);
						}
					}							
				}	
				y_line++;
			}
		}
	}