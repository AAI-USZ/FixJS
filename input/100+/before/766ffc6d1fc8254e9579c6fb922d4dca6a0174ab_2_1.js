function(root){

	var states = root && davinci.ve.states.getStates(root);

	var items = [""];



	for(var i in states){

		items.push(states[i] + ":State");

	}

		

	return items;

}