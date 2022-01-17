function (event) {
      console.log(event);
      console.log("You clicked!");
      var mysvg = d3.select("svg");
      mysvg.append("circle")
        .style("stroke", "gray")
        .style("fill", "white")
        .attr("r", 40)
        .attr("cx", event.layerX)
        .attr("cy", event.layerY)
        .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
        .on("mouseout", function(){d3.select(this).style("fill", "white");});
        Circles.insert({
		          graph_id: Session.get('selected_graph'), 
		          cx: event.layerX,
		          cy: event.layerY }) ;
    }