function loadConf() {

playerSaveData = JSON.parse(localStorage.getItem("4chanSP"))

		if(!playerSaveData) {

			playerSaveData = playerDefault;

		}else if(!playerSaveData.saveVer) {		

			playerSaveData.css = playerDefault.css;

		}

}