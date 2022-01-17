function backgroundAlarm(red) {
		var red;
		var frameskip = 40; //Value for animationspeed of the color change
		document.body.style.backgroundColor = 'rgb(' + red + ', 0, 0)';

		setTimeout(function() {

			if(red>=255 || red<0){
				neg=neg*(-1);		
			}
			backgroundAlarm(red=red+frameskip*neg);	

		}, 100);
	}