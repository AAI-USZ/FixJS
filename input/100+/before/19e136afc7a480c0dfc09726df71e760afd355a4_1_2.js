function(e){
	//only disrupt the key press if it is the key registered as down
	if (e.which == 16){
		inputState.shiftDown = false;
	} else if (inputState.key.values.indexOf(e.which) > -1){
		var target = inputState.key.values.indexOf(e.which);
		inputState.key.values.splice(target, 1);
		inputState.pressed.splice(target, 1);
		console.log(inputState.key.values);
		//inputState.key.press = false;
	} else if (inputState.key.values.indexOf(e.which + 32) > -1){
		var target = inputState.key.values.indexOf(e.which + 32);
		inputState.key.values.splice(target, 1);
		inputState.pressed.splice(target, 1);
		console.log(inputState.key.values);
		//inputState.key.press = false;
	}
}