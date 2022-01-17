function hello_world(dom_id) {


    // bear and cat.
    var friends = [ animals[0], animals[1] ,animals[2] ];
    
    // dog and cat.
    var family =  [ animals[2], animals[3] ];

    // dog and wolf
    var canine = [ animals[3], animals[4] ];

    // bear and otter and wolf.
    var wild =  [ animals[0], animals[1] , animals[4] ];

    var svg = d3.select("#simple_svg").append("svg")
	.attr("class", "chart")
	.attr("width", 500)
	.attr("height", 100);

    cycle_through_animals([make_set(friends),
			   make_set(family),
			   make_set(friends),
			   make_set(family),
			   make_set(friends),
			   make_set(family),
			   make_set(friends)
			  ],
			   svg);

}