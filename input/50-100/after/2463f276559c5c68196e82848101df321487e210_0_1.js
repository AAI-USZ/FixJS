function() {
			
			if(red>=255 || red<0){
				neg=neg*(-1);		
			}
			if (STATUS) {
				backgroundAlarm(red=red+frameskip*neg);	
			} else {
				$("body").css("background-color", "black");
			}
		}