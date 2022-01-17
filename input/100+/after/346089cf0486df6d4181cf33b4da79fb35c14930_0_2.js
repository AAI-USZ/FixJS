function cycle_through_animals(animal_sets,svg) {
    if (animal_sets.length > 0) {
	// index_fn: what key to use to compare items for equality.
	var index_fn = function(d) {return d.animal_id;};
	
	// text_fn: what to display in the output SVG circle.
	var text_fn = function(d) {return d.name;};
	
	// show the next set in animal_sets.
	var animal_set = animal_sets.shift();

	console.log("switching to set:" + animal_set.map(text_fn));

	d3.select("#status").html("SET IS: " + animal_set.map(text_fn));

	update_svg(svg,animal_set,index_fn,text_fn);
	
	if (animal_sets.length > 0) {
	    setInterval(function() {
		cycle_through_animals(animal_sets,svg);
	    },2000);
	} else {
	    console.info("DONE.");
	}

    }
    return false;
}