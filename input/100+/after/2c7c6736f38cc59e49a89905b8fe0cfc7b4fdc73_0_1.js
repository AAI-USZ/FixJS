function()
	{
	
                
		var node = g.svg.selectAll("g.node")
			.data(g.cGraph.nodes(),function(d){return d.baseID}).enter().append("g")
			.attr("class", "node")
			.attr("transform", function(d) { d.currentX = d.x; d.currentY = d.y; return })

			.on("click", function(d){
				var o = d3.select(this); 
				if (o.classed("selected"))
				{
					d.selected = true
					o.classed("selected",0)
					o.select("circle").style("fill","steelblue");
				}else{
					d.selected = false
					o.classed("selected",1)
					o.select("circle").style("fill","red");
				}
			})			
		       .on("mouseover", function(){d3.select(this).select("circle").style("fill","yellow"); })
		       .on("mouseout",function(){
				var o = d3.select(this); 
				if (o.classed("selected")) 
				{
					o.select("circle").style("fill","red");
				}else{
					o.select("circle").style("fill","steelblue");
				}
		       });

		
		node.append("circle").attr("class", "node").classed("circle", 1)
			.attr("cx", function(d){d.currentX = d.x; return d.currentX})
			.attr("cy", function(d){d.currentY = d.y; return d.currentY})
			.attr("r", 5)
			.style("fill", "steelblue")
			

		//textNode = node.append("g").attr("class", "node")
                //        .classed("textGroup", 1)
                        
                node.append("text").attr("class", "node").classed("text", 1)
			.attr("dx", function(d){d.currentX = d.x; return d.currentX})
			.attr("dy", function(d){d.currentY = d.y; return d.currentY})
			.style("stroke", "black")
			.style("stroke-width", 0.5)
			.style("font-family", "Arial")
			.style("font-size", 12)
			.text(function(d) { return d.label; });		
	}