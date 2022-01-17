function(d){
				var o = d3.select(this); 
				if (o.classed("selected"))
				{
					d.selected = 1
					o.classed("selected",0)
					o.select("circle").style("fill","steelblue");
				}else{
					d.selected = 0
					o.classed("selected",1)
					o.select("circle").style("fill","red");
				}
			}