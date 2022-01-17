function supVis(dat){ //visualize data
   var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select("#chart").insert("svg", ":first-child")
   .attr("width", width)
   .attr("height", height);

d3.select("#chart").insert("div", ":first-child")
    .style("id", "title") 
    .html("<br/><br/><br/>" + dat.supplychain.attributes.title);

json=dat;
data = {};
                  data.nodes = [];
                  data.links = [];
  
                  var stopmax = 1;
                  var hopmax = 1;
                  var fill=d3.scale.category20();

                  if(typeof(json.supplychain.stops) != 'undefined') {
                      for(var i=0; i<json.supplychain.stops.length; ++i) {
                          var s = json.supplychain.stops[i];
                          if(typeof(s.attributes.co2e) != 'undefined') {
                              if(Number(s.attributes.co2e) > stopmax) {
                                  stopmax = Number(s.attributes.co2e);
                              }
                          }     
                      }

                      for (var i=0; i<json.supplychain.stops.length; ++i) {
                          var size = 10;
                          if(typeof(json.supplychain.stops[i].attributes.co2e) != 'undefined') {
                              size  = Math.max(10, 20 * json.supplychain.stops[i].attributes.co2e / stopmax);
                          }
                              var newNode = {
                                  "name": json.supplychain.stops[i].attributes.title, 
                                  "group":json.supplychain.stops[i].local_stop_id-1,
                                  "size":size                 
                              }
                              data.nodes[json.supplychain.stops[i].local_stop_id-1] = newNode;
                      }
                  }
                  if(typeof(json.supplychain.hops) != 'undefined') {
                      for(var i=0; i<json.supplychain.hops.length; ++i) {
                          var s = json.supplychain.hops[i];
                          if(typeof(s.attributes.co2e) != 'undefined') {
                              if(Number(s.attributes.co2e) > hopmax) {
                                  hopmax = Number(s.attributes.co2e);
                              }
                          }     
                      }
      
                      for (var i=0; i<json.supplychain.hops.length; ++i) {
                          var size = 4;
                          if(typeof(json.supplychain.hops[i].attributes.co2e) != 'undefined') {
                              size  = Math.max(4, 8 * json.supplychain.hops[i].attributes.co2e / hopmax);
                          }
          
                          var newLink = {
                                            "source": json.supplychain.hops[i].from_stop_id-1, 
                                            "target": json.supplychain.hops[i].to_stop_id-1,
                                            "value": 1,
                                            "size": size
                                        };
                          data.links.push(newLink);
                      }
                  }





      force
      .nodes(data.nodes)
      .links(data.links)
      .start();

  var link = svg.selectAll("line.link")
      .data(data.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll("circle.node")
      .data(data.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  });

    /*d3 testing    
    var dataset = [5,15,25];
    
    d3.select("#dOut").selectAll("div")
        .data(dataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d){
            var barHeight = d * 5; //scale up by fact of 5
            return barHeight + "px";
        });*/
}