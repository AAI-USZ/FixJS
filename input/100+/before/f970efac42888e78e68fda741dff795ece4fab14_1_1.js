function() {

    var width = 279
      , height = 36
      , svg = d3.select(this.el)
                .append("svg")
                .attr("width",width)
                .attr("height",height);

    // Get scales and create the line
    var x = d3.scale.linear().domain([0, this.requests.length]).range([0, width])
      , y = d3.scale.linear().domain([0, _.max(this.requests, function(num) {return num})]).range([0, height])
      , line = d3.svg.line()
                .x(function(d,i) { return x(i); })
                .y(function(d) { return y(d); })
                .interpolate("basis")
  
      // display the line by appending an svg:path element with the data line we created above
      svg.append("svg:path")
        .attr("d", line(this.requests))
        .style("fill", "none")
        .style("stroke-width", "2")
        .style("stroke", "#409FCE")

    return this;
  }