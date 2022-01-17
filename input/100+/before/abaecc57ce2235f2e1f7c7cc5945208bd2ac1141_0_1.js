function(myGameState){
		for (var i=0; i< playerObj.length; i++){
			playerObj[i].wins = myGameState[i].wins;
			playerObj[i].money = myGameState[i].money;
		}
		draw("hallOfFame");
	}