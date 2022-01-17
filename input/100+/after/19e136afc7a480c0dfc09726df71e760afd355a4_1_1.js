function(e){
	if (e.which == 16){
		inputState.shiftDown = true;
	} else {
		if(!inputState.shiftDown && ((e.which >= 65) && (e.which <= 90))){
			if (inputState.key.values.indexOf(e.which + 32) == -1){
				inputState.key.values.push(e.which + 32);
				if(inputState.key.values.length == 1){
					inputState.key.press = true;
				}
				console.log(inputState.key.values);
			}
		} else {
			if (inputState.key.values.indexOf(e.which) == -1){
				inputState.key.values.push(e.which);
				if(inputState.key.values.length == 1){
					inputState.key.press = true;
				}
				console.log(inputState.key.values);
			}
		}
	}
}