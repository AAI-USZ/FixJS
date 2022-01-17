function pause(){
		  console.log ("PAUSE");
			for (var i in tweens){
				tweens[i].stop();
				ispaused = true;
				isanimating = false;
			}
		}