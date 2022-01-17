function()
	{
		var target = 'substrate'

		var bt1 = svg_substrate.selectAll("rect button1").data(["induced subgraph"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 10 + ")"; })
			.on("click", function(){console.log("This,",this);d3.select(this).select("rect").style("fill","yellow"); sendSelection(getSelection(target), target);})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})

		bt1.append("rect")
			.attr("class", "button1")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')
			

		bt1.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')



		var bt2 = svg_substrate.selectAll("rect button2").data(["force layout"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 35 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); callLayout("FM^3 (OGDF)", target)})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})

		bt2.append("rect")
			.attr("class", "button2")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	

		bt2.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')



		var bt3 = svg_substrate.selectAll("rect button3").data(["circular layout"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 60 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); callLayout("Circular", target)})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})

		bt3.append("rect")
			.attr("class", "button3")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	

		bt3.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')


		var bt4 = svg_substrate.selectAll("rect button4").data(["random layout"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 85 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); callLayout("Random", target)})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})

		bt4.append("rect")
			.attr("class", "button4")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	

		bt4.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')
	



		var bt5 = svg_substrate.selectAll("rect button5").data(["degree metric"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 110 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); callFloatAlgorithm("Degree", target)})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})

		bt5.append("rect")
			.attr("class", "button5")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	

		bt5.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')


		var bt6 = svg_substrate.selectAll("rect button6").data(["analyse"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 135 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); analyseGraph()})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})
		
		bt6.append("rect")
			.attr("class", "button6")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	
			.on("mouseover", function(){d3.select(this).style("fill","red");})
			.on("mouseout", function(){d3.select(this).style("fill","lightgray");})

		bt6.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')


		var bt7 = svg_substrate.selectAll("rect button7").data(["analyse selection"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 160 + ")"; })
			.on("click", function(){d3.select(this).select("rect").style("fill","yellow"); syncGraph(getSelection(target), target)})
			.on("mouseover", function(){d3.select(this).select("rect").style("fill","red");})
			.on("mouseout", function(){d3.select(this).select("rect").style("fill","lightgray");})
		
		bt7.append("rect")
			.attr("class", "button6")
			.attr("width", 120)
			.attr("height", 20)
			.style("fill", 'lightgray')	
			.on("mouseover", function(){d3.select(this).style("fill","red");})
			.on("mouseout", function(){d3.select(this).style("fill","lightgray");})

		bt7.append("text")
			.attr("dx", 5)
			.attr("dy", 15)
			.text(function(d){return d})
			.style("fill", 'green')


		var coh = svg_substrate.selectAll("rect cohesion").data(["cohesion"]).enter().append('g')
			.attr("transform", function(d) { return "translate(" + 10 + "," + 395 + ")"; })
			
		
		coh.append("rect")
			.attr("class", "cohesionframe")
			.attr("width", 120)
			.attr("height", 90)
			.style("fill-opacity", 0)
			.style("stroke-width", 1)
			.style("stroke", 'black')	

		coh.append("text")
			.attr('class', 'cohesionlabel')
			.attr("dx", 5)
			.attr("dy", 15)
			.text("Cohesion")
			.style("fill", 'black')

		coh.append("text")
			.attr('class', 'intensitylabel')
			.attr("dx", 10)
			.attr("dy", 35)
			.text("intensity:")
			.style("fill", 'black')

		coh.append("text")
			.attr('class', 'intensity')
			.attr("dx", 110)
			.attr("dy", 50)
			.text(function(d){return ""+cohesion_intensity})
			.style("fill", 'blue')
			.style('text-anchor', 'end')

		coh.append("text")
			.attr('class', 'homogeneitylabel')
			.attr("dx", 10)
			.attr("dy", 70)
			.attr("width", 120)
			.text('homogeneity:')
			.style("fill", 'black')

		coh.append("text")
			.attr('class', 'homogeneity')
			.attr("dx", 110)
			.attr("dy", 85)
			.text(function(d){return ""+cohesion_homogeneity})
			.style('text-anchor', 'end')
			.style("fill", 'blue')

	}