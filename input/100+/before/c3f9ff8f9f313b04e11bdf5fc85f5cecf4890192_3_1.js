function(e){
	//only disrupt the key press if it is the key registered as down
	if (e.which == 16){
		inputState.shiftDown = false;
	} else if ((inputState.key.value == e.which) || (inputState.key.value == e.which + 32)){
		inputState.key.value = null;
		inputState.key.down = false;
		inputState.key.press = false;
	}
}