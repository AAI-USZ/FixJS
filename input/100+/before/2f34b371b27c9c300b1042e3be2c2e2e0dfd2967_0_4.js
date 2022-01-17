function updateUserCSS() {

	var table = document.getElementById('playerSettings');

	var elems = table.getElementsByTagName('input');

	playerSaveData.userCSS = "";

	for(var i = 0; i < elems.length;i++){

		if(elems[i].value){

			if(elems[i].sets){

				var add = (playerSaveData.userCSS.length<1?"":" ")+elems[i].sets.replaceAll('%1',elems[i].value);

				playerSaveData.userCSS += add;

			}

			else if(elems[i].func){

				playerSaveData.userCSS += (playerSaveData.userCSS.length<1?"":" ")+ new Function("self",elems[i].func)(elems[i]);

			}

		}

	}

	addCSS();

}