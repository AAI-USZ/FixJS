function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
      // Draw a 200x200 svg blue box
      var vis = d3.select("#vis");
      var box = vis.append("svg");
      box.style('width', 200).style('height', 200);
    }