function hello_world(dom_id) {

    var svg = d3.select("#simple_svg").append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 500);

    cycle_through_animals(function() {random_set();},
			  svg);

}