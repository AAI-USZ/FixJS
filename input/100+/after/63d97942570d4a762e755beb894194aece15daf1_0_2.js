function update_svg(svg, newdata_array, index_fn,
		    text_fn) {
    var set_complement = complement(animals,newdata_array);

    var newdata = svg.selectAll("circle").data(newdata_array,index_fn);

    // Add items unique to input_data.
    newdata.enter().append("circle").
	attr("cx",function(c) {
	    console.log("appending: " + c.name + "/" + c.animal_id);
	    return c.x;
	}).
	attr("cy",function(c) {return -100;}).
        attr("r", function(c) {return 25;}).
	transition().duration(1500).
	attr("cy",65);
    
    var newlabels = svg.selectAll("text").data(newdata_array,index_fn);
    newlabels.enter().append("text").
	attr("x",function(c) {
	    return c.x - 10;}).
	attr("y",function(c) {return -100;}).
        attr("r", function(c) {return 25;}).
	text(text_fn).
	transition().duration(1500).
	attr("y",68);

    // Remove items not in new data.
    newdata.exit().transition().duration(2500)
        .style("fill","white")
        .style("stroke","white")
	.attr("cy",
	      function(animal) {
		  console.log("removing:" + animal.name + "/" + animal.animal_id);
		  return 200;
	      }).remove();

    // Remove labels not in new data.
    newlabels.exit().transition().duration(2500)
        .style("stroke","white")
        .style("fill","white")
	.attr("y",200).remove();
}