function loadConf() {

	playerSaveData = JSON.parse(localStorage.getItem("4chanSP"));

	if(!playerSaveData) {

		playerSaveData = playerDefault;

	}else if(playerSaveData.css) {		

		playerSaveData.css = undefined;

		playerSaveData.saveVer = undefined;

	}

}