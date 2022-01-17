function(myGameState){
		for (var i=0; i< playerObj.length; i++){
			playerObj[i].wins = myGameState[i].wins;
			playerObj[i].money = myGameState[i].money;
			//console.log ("playerObj[i]",playerObj[i]);
			//console.log ("refPlayerObj[i]",refPlayerObj[i]);
			playerObj[i].maxBombs=refPlayerObj[i].maxBombs;
			playerObj[i].fireRange=refPlayerObj[i].fireRange;
			playerObj[i].timebomb=refPlayerObj[i].timebomb;
			playerObj[i].speed=refPlayerObj[i].speed;
			playerObj[i].invinsible=refPlayerObj[i].invinsible;
		}
		draw("hallOfFame");
	}