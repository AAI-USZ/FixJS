function activate_transition(net, marking, tname) {
    // Copy current marking
    var post_marking = {}
    for(var pname in marking) {
	post_marking[pname] = marking[pname];
    }

    // Collect input places
    var input_places = [];
    for(var i = 0; i < net.place_transition.length; i++) {
	if(net.place_transition[i][1] === tname) {
	    input_places.push(net.place_transition[i][0]);
	}
    }
    
    // Check that input places are all marked
    // Note: If there are no input places, transition is always firable
    for(var i = 0; i < input_places.length; i++) {
	if(marking[input_places[i]] < 1) {
	    // Failed activation precondition, return marking unmodified
	    return post_marking;
	}	
    }

    // Collect output places
    var output_places = [];
    for(var i = 0; i < net.transition_place.length; i++) {
	if(net.transition_place[i][0] === tname) {
	    output_places.push(net.transition_place[i][1]);
	}
    }

    // Decrement input place token count
    for(var i = 0; i < input_places.length; i++) {
	var pname = input_places[i];
	post_marking[pname] = Math.max(post_marking[pname] - 1, 0);
    }
	
    // Increment output place token count
    for(var i = 0; i < output_places.length; i++) {
	var pname = output_places[i];
	if(pname in post_marking) {
	    post_marking[pname] += 1;
	} else {
	    post_marking[pname] = 1;
	}
    }

    return post_marking;
}