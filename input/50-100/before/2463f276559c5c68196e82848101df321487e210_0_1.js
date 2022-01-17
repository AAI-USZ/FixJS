function() {

			if(red>=255 || red<0){
				neg=neg*(-1);		
			}
			backgroundAlarm(red=red+frameskip*neg);	

		}