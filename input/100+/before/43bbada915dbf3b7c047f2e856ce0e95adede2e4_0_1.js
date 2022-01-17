function (cx, cy) {
    var mysvg = d3.select("svg");
    mysvg.append("circle")
      .style("stroke", "gray")
      .style("fill", "white")
      .attr("r", 40)
      .attr("cx", cx)
      .attr("cy", cy)
      .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
      .on("mouseout", function(){d3.select(this).style("fill", "white");});
  }