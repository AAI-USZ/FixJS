function(e) {

			e.preventDefault();

			switch(playerSaveData.repeat){

				case 0: playerSaveData.repeat=1; playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;

				case 1: playerSaveData.repeat=2; playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;

				case 2: playerSaveData.repeat=0; playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;

			}

		}