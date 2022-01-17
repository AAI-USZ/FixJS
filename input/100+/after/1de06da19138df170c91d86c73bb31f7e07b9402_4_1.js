function(value){

	var l = this;

	var key = Math.round(value);

	if (key >= l.min && key <= l.max){

	    var c = [l.map[key][0],l.map[key][1],l.map[key][2]];

		return c;

	}

	else if (key <l.min) { //truncate to min value

			return  [l.map[l.min][0],l.map[l.min][1],l.map[l.min][2]];

	}

	else if (key>l.max){ //truncate to max value

		return  [l.map[l.max][0],l.map[l.max][1],l.map[l.max][2]];

	}

	else{

		alert('assertion error in getColor routine');

		return  [l.map[l.min][0],l.map[l.min][1],l.map[l.min][2]];

	}

		

}