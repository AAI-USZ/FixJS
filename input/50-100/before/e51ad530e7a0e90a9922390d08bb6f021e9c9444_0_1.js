function(){
				var o = d3.select(this); 
				if (o.classed("selected"))
				{
					o.classed("selected",0)
					o.select("circle").style("fill","steelblue");
				}else{
					o.classed("selected",1)
					o.select("circle").style("fill","red");
				}
			}