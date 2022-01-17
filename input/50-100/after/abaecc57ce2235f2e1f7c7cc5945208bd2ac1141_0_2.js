function resetArray(){
		for (var i=0;i<playerObj.length;i++){
			playerObj[i].wins=0;
			playerObj[i].money=0;
			playerObj[i].maxBombs=1;
			playerObj[i].fireRange=2;
			playerObj[i].timebomb=false;
			playerObj[i].speed=1.5;
			playerObj[i].invinsible=false;
		}
	}