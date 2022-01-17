function (d, i) {
      //Set the chart's dimensions
      d3.select("#chart")
        .attr("width", width * 2)
        .attr("height", height);

      //Draw the background for the chart
      d3.select("#chart")
        .insert("svg:rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "#FFF");

      //Our canvas, where the curves will be rendered, and which will be clipped.
      var chart = d3.select("#chart").append("svg:g");

      //Make the clipPath (for cropping the paths) //TODO: actually employ this
      chart.insert("defs")
        .append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height); //height / 4 - 20);

      //Make and render the curves.
      chart.selectAll("path")
          .data(d3.range(numOfBands)) //TODO: make this number of positive bands, then make another for negative ones.
        .enter().append("path")
          .attr("fill", "rgba(0, 0, 255, " + 1.0 / numOfBands + ")") //function (d, i) { return colors[i]; }) //TODO: use a non-linear scale for this instead!!!
          .style("stroke-width", 2)
          .style("cursor", "help")
          .attr("d", d3area1(d))
          .attr("transform", function (d, i) {return "translate(0, " + (i - 1) * 50 + ")"; });


      //Draw the outline for the chart
      d3.select("#chart")
        .append("svg:rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "rgba(0,0,0,0)")
          .style("stroke-width", 3)
          .style("stroke", "#000");
    }