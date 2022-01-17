function getNextActivePlayer(x){
		var ret=-1
		for (var i=x; i<playerObj.length; i++){
			if (playerObj[i].money>0){
				ret=i;
				break;
			}
		}
		return ret;
	}