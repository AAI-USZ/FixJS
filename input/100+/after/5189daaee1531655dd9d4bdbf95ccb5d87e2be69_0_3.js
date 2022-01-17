function generateUi(playerObj, config)
{
	var that = this;
	
	var refPlayerObj=[
		{username:"POLICEMAN", spriteposition: 0,controls:{left:65,right:68,up:87,down:83,bomb:32},money:0,maxBombs:1,fireRange:2,timebomb:false,speed:1.5,invinsible:false,wins:0},
		{username:"DUKE", spriteposition: 1,controls:{left:37,right:39,up:38,down:40,bomb:13},money:0,maxBombs:1,fireRange:2,timebomb:false,speed:1.5,invinsible:false,wins:0},
		{username:"DETECTIVE", spriteposition: 2,controls:{left:49,right:51,up:52,down:50,bomb:53},money:0,maxBombs:1,fireRange:2,timebomb:false,speed:1.5,invinsible:false,wins:0},
		{username:"GREEN", spriteposition: 3,controls:{left:54,right:56,up:57,down:55,bomb:48},money:0,maxBombs:1,fireRange:2,timebomb:false,speed:1.5,invinsible:false,wins:0},
		{username:"CHINESE", spriteposition: 4,controls:{left:74,right:76,up:73,down:75,bomb:77},money:0,maxBombs:1,fireRange:2,timebomb:false,speed:1.5,invinsible:false,wins:0}
	];
	var playerObj=[];
	var config = {
		"menu":[
			{text:"WINS NEEDED",value:3,min:3,max:9},
			{text:"PLAYERS",value:2,min:2,max:5},
			{text:"SHOP",value:"ON"},
			{text:"SHRINKING",value:"OFF"},
			{text:"FASTIGNITION",value:"ON"},
			{text:"STARTMONEY",value:"OFF"},
			{text:"NORMALLEVEL",value:"YES"},
			{text:"GAMBLING",value:"YES"}
		],
		"player":[
			{name:"POLICEMAN",taken:false,sx:0,sy:0,sw:32,sh:44},
			{name:"DUKE",taken:false,sx:0,sy:132,sw:32,sh:44},
			{name:"DETECTIVE",taken:false,sx:0,sy:264,sw:32,sh:44},
			{name:"GREEN",taken:false,sx:0,sy:396,sw:32,sh:44},
			{name:"CHINESE",taken:false,sx:0,sy:528,sw:32,sh:44},
			{name:"MICHA",taken:false,sx:0,sy:660,sw:32,sh:44}
		],
		"environmentExtras":[
			{name:"throphy",sx:64,sy:224,sw:32,sh:32},
			{name:"money",sx:32,sy:224,sw:32,sh:32}
		],
		"buyableExtras":[
			{name:"EXTRA BOMB",sx:32,sy:160,sw:32,sh:32,prize:1,extrasname:"maxBombs"}, 
			{name:"POWER-UP",sx:64,sy:160,sw:32,sh:32,prize:1,extrasname:"fireRange"},
			{name:"TIMEBOMB",sx:96,sy:160,sw:32,sh:32,prize:3,extrasname:"timeBomb"},
			{name:"PROTECTION",sx:0,sy:192,sw:32,sh:32,prize:3,extrasname:"invinsible"},
			{name:"SPEED-UP",sx:0,sy:160,sw:32,sh:32,prize:4,extrasname:"speed"}
		]
			};
			
	var size_x=608;
	var size_y=480;
	scene="";
	var cntdown=3;
	
	var extras=new Image();
	extras.src="img/sprites.png";
			
	var players=new Image();
	players.src="img/sprite_players.png";
				
	var startScreen=new Image();
	startScreen.src="img/logo.png";

	var creditsScreen=new Image();
	creditsScreen.src="img/credits.png";
			
	var active_position=0;
	var playerArray_position=0;
	var active_player=0;
	
	var canv = document.getElementById ("canv");
	var ctx = canv.getContext ("2d");
	ctx.font = "15px Amiga";
	
	function generatePlayerobj(x)
	{
		for (var i=0; i<x; i++){
			playerObj[i]=refPlayerObj[i];
			config.player[playerObj[i].spriteposition].taken = true;
		}
	}
	
	function getNextActivePlayer(x){
		var ret=-1
		for (var i=x; i<playerObj.length; i++){
			if (playerObj[i].money>0){
				ret=i;
				break;
			}
		}
		return ret;
	};
			
	function gameEnds(){
		var ret=false;
		for (var i=0;i<playerObj.length;i++){
			if (playerObj[i].wins === config.menu[0].value){
				console.log("enough gametime");
				ret=true
				break;
			}
		}
		return ret;
	};
			
	function resetArray(){
		for (var i=0;i<playerObj.length;i++){
			playerObj[i].wins=0;
			playerObj[i].money=0;
		}
	}
	
	function countDown(){
		console.log("countDown",cntdown);
		ctx.clearRect (0, 0, canv.width, canv.height);
		ctx.fillText (cntdown, size_x/2, size_y/2);
		cntdown--;
		if (cntdown < 0){
			draw("game");
		}
		else{
			setTimeout(countDown, 1000);
		}
	};
		
	function toggle(value){
		if (value=='YES'){
			value='NO';
		}
		else if(value=='NO'){
			value='YES';
		}
		else if(value=='ON'){
			value='OFF';
		}
		else if(value=='OFF'){
			value='ON';
		}
		return value;
	};
			
	gameFinished = function(myGameState){
		for (var i=0; i< playerObj.length; i++){
			playerObj[i].wins = myGameState[i].wins;
			playerObj[i].money = myGameState[i].money;
		}
		draw("hallOfFame");
	};
			
	function drawShop(playerNr){
		if (playerNr===-1){
			active_player=0;
			draw("countdown");
		}
		else{
			active_player = playerNr;
			scene = "shop";
			var y_line=1;
			
			ctx.fillStyle = "blue";
			ctx.clearRect (0, 0, canv.width, canv.height);
			
			for(var i=0;i < config.buyableExtras.length; i++){
				if (y_line == 1){
					ctx.fillText (playerObj[active_player].username + " ENTERS SHOP", 100, 35*y_line);
					y_line++;
							
					if (playerObj[active_player].money > 0){
						ctx.fillText ("MONEY:", 50, 45*y_line);
						for (var j=0; j < playerObj[active_player].money; j++){
							ctx.drawImage(extras,config.environmentExtras[1].sx,config.environmentExtras[1].sy,config.environmentExtras[1].sw,config.environmentExtras[1].sh,150+(j*32),35*y_line,config.environmentExtras[1].sw,config.environmentExtras[1].sh);
							//ctx.fillText ("t", 300+(j*32), 45*y_line);
						}
					}
					y_line++;
					ctx.fillText ("EXTRAS", 170, 45*y_line);
					ctx.fillText ("PRIZE", 370, 45*y_line);
					y_line++;
				}
					
				if (active_position===i){
					ctx.fillStyle = "red";
					ctx.fillText (" > ", 70, 45*y_line);
				};
				ctx.fillStyle = "blue";
				ctx.fillText(config.buyableExtras[i].name, 120, 45*y_line);
				ctx.drawImage(extras,config.buyableExtras[i].sx,config.buyableExtras[i].sy,config.buyableExtras[i].sw,config.buyableExtras[i].sh,300,41*y_line,config.buyableExtras[i].sw,config.buyableExtras[i].sh);
				ctx.fillText(config.buyableExtras[i].prize, 370, 45*y_line);
				y_line++;
			}
			if (active_position===config.buyableExtras.length){
				ctx.fillStyle = "red";
				ctx.fillText (" > ", 200, 45*y_line);
			};
			ctx.fillText ("EXIT", 250, 45*y_line);
		}
	}
	
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
					ctx.fillStyle = "#15527c";
					ctx.fillText ("MAIN MENU", 220, 35*y_line);
					y_line++;
					ctx.fillText ("---------", 220, 35*y_line);			
					y_line++;
				}
				if (active_position===i){
					ctx.fillStyle = "blue";
					ctx.fillText (" > ", 70, 35*y_line);
				};
				ctx.fillStyle = "#15527c";
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
					ctx.fillText ("CHOOSE PLAYER", 200, 35*y_line);
					y_line++;
					ctx.fillText ("---------", 230, 35*y_line);			
					y_line++;
				}
				if (active_position===i){
					ctx.fillStyle = "blue";
					ctx.fillText (" > ", 70, 45*y_line);
				};
				ctx.fillStyle = "#15527c";
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
	};
	
	$(document).keydown(function(event){
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
						if (config.buyableExtras[active_position].name==="POWER-UP"){
							playerObj[active_player].fireRange++;
						}
						if (config.buyableExtras[active_position].name==="TIMEBOMB"){
							playerObj[active_player].timeBomb = true;
						}
						if (config.buyableExtras[active_position].name==="POWER-UP"){
							playerObj[active_player].invinsible = true;
						}
						if (config.buyableExtras[active_position].name==="SPEED-UP"){
							playerObj[active_player].speed = playerObj[active_player].speed + 0.5;
						}
						console.log("geld reicht");
						//drawShop(active_player);
					}
					else if(playerObj[active_player].money === 0){
						console.log("not enough");
						//playSound("burb");
						//active_player++;
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
				drawShop(active_player);
			}
			else if (event.which === playerObj[active_player].controls.up){ //up
				if (active_position >0){
					active_position--;
				}
				console.log("up");
				drawShop(active_player);
			}
			else if (event.which === playerObj[active_player].controls.down){ //down
				if (active_position < config.buyableExtras.length){
					active_position++;
				}
				console.log("down");
				drawShop(active_player);
			}
		}
	});
	generatePlayerobj(1);
	draw("start");
}