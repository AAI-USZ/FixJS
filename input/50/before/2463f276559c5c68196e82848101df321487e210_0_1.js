function() { 
			if(STATUS){
				backgroundAlarm(startcolor);
				setTimeout(function(){
					startShrinking();
				}, 5000);
				//alarm.play();
			}
		}