f{ 

	var width = 960,
	    height = 500;
	 
	var color = d3.scale.category20();
	 
	 
	var force_substrate = d3.layout.force()
	    .charge(-240)
	    .linkDistance(40)
	    .size([width, height]);

	
	var force_catalyst = d3.layout.force()
	    .charge(-240)
	    .linkDistance(40)
	    .size([width, height]);
	
	var tulip_address = "http://localhost:8085"
	var json_address = "./cluster1.json"


	var svg_substrate = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	
	var svg_catalyst = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height);
	
	var graph_substrate = graph();
	var graph_catalyst = graph();
	//var drawing_substrate = graphDrawing();
	//var drawing_catalyst = graphDrawing();

	var getSelection = function(graphName)
	{
		cGraph = graph_substrate
		svg = svg_substrate
		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}


		console.log("The node selection= ");
		var u = svg.selectAll("g.node.selected").data();

		var toStringify = {};
		toStringify.nodes = new Array();

		for (i=0; i<u.length; i++)
		{
			var node = {};
			node.baseID = u[i].baseID;
			console.log(u[i]);
			toStringify.nodes.push(node);
		}
		console.log(JSON.stringify(toStringify));
		return JSON.stringify(toStringify)
	};







	var sendSelection = function(json, graphName)
	{
		cGraph = graph_substrate
		svg = svg_substrate
		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}

		$.post(tulip_address, { type:"update", graph:json, target:graphName }, function(data){
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			g = graphDrawing(cGraph, svg)
			g.exit(cGraph, 0)

			
		});

	};








	var callLayout = function(layoutName, graphName)
	{

		var params = {type:"layout", name:layoutName, target:graphName}
		console.log('going to send params as: ', params)
		
		cGraph = graph_substrate
		svg = svg_substrate
		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}

		$.post(tulip_address, {type:'algorithm', parameters:JSON.stringify(params)}, function(data){
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			g = graphDrawing(cGraph, svg)
			g.move(cGraph, 0)

		});
	};




	var callFloatAlgorithm = function(floatAlgorithmName, graphName)
	{

		var params = {type:"float", name:floatAlgorithmName, target:graphName}

		cGraph = graph_substrate
		svg = svg_substrate
		if (graphName == 'catalyst')
		{	
			cGraph = graph_catalyst
			svg = svg_catalyst
		}
	

		$.post(tulip_address, {type:'algorithm', parameters:JSON.stringify(params)}, function(data){
		
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			g = graphDrawing(cGraph, svg)
			g.resize(cGraph, 0)

		});
	};




	var addBaseID = function(data, idName)
	{
		if (idName == "")
		{
			data.nodes.forEach(function(d, i){d.baseID = i})
			data.links.forEach(function(d, i){d.baseID = i})
		}
		else
		{
			data.nodes.forEach(function(d, i){d.baseID = d[idName]})
			data.links.forEach(function(d, i){d.baseID = d[idName]})
		}
	}


	var loadJSON = function(data)
	{
		rescaleGraph(data)

		graph_substrate.nodes(data.nodes)
		graph_substrate.links(data.links)
		graph_substrate.edgeBinding()
		//console.log("graph_substrate", graph_substrate)

		var g = graphDrawing(graph_substrate, svg_substrate)
		g.draw()
		
		/*
		jsonGraph.nodes().forEach(function(d){d.x -= 10})
		g.move(jsonGraph, 0)

		jsonGraph.nodes().forEach(function(d){d.y = 50})
		g.move(jsonGraph, 0)
		*/
		return
	}
	

	var syncGraph = function(selection, graphName)
	{
		console.log('sending a synchronization request: ', graphName)

		cGraph = graph_catalyst
		svg = svg_catalyst
		if (graphName == 'catalyst')
		{	
			cGraph = graph_substrate
			svg = svg_substrate
		}

	

		$.post(tulip_address, {type:'analyse', graph:selection, target:graphName}, function(data){
			console.log("received data after synchronization: ")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
			cGraph.nodes(data.nodes)
			cGraph.links(data.links)
			cGraph.edgeBinding()
			g = graphDrawing(cGraph, svg)
			//g.clear()
			//g.draw()
			g.show(cGraph)
		});

	}



	var analyseGraph = function()
	{
	  	var params = {type:"analyse"}
	

		$.post(tulip_address, {type:'analyse', target:'substrate'}, function(data){
			console.log("received data after analysis:")
			console.log(data);
			//convertLinks(data);
			rescaleGraph(data)
			graph_catalyst.nodes(data.nodes)
			graph_catalyst.links(data.links)
			graph_catalyst.edgeBinding()
			g = graphDrawing(graph_catalyst, svg_catalyst)
			g.clear()
			g.draw()
		});

	}




	var createTulipGraph = function(json)
	{
		$.post(tulip_address, { type:"creation", graph:json }, function(data){
			console.log('creating in tulip, and recieved data: ',data)
			rescaleGraph(data)
			graph_substrate.nodes(data.nodes)
			graph_substrate.links(data.links)
			graph_substrate.edgeBinding()
			g = graphDrawing(graph_substrate, svg_substrate)
			g.move(graph_substrate, 0)
		});
	}



	var rescaleGraph = function(data)
	{
		var buttonWidth = 130.0
		var frame = 10.0
		var w = width-(buttonWidth+2*frame)
		var h = height-(2*frame)

		var minX = data.nodes[0].x
		var maxX = data.nodes[0].x
		var minY = data.nodes[0].y
		var maxY = data.nodes[0].y

	
		data.nodes.forEach(function(d){if (d.x < minX){minX = d.x}; if (d.x > maxX){maxX = d.x}; if (d.y < minY){minY = d.y}; if (d.y > maxY){maxY = d.y};})
	
		//data.nodes.forEach(function(d){console.log("Point: ",d.x,' ', d.y)})

		var delta = 0.00000000000000000001 //to avoid division by 0
		scale = Math.min.apply(null, [w/(maxX-minX+delta), h/(maxY-minY+delta)])
	
		data.nodes.forEach(function(d){d.x = (d.x-minX)*scale+buttonWidth+frame; d.y = (d.y-minY)*scale+frame;})
	}



	var addInterfaceCatalyst = function()
	{
		var target = "catalyst"

		var bt1 = svg_catalyst.selectAll("rect button1").data(["induced subgraph"]).enter().append('g')
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



		var bt2 = svg_catalyst.selectAll("rect button2").data(["force layout"]).enter().append('g')
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



		var bt3 = svg_catalyst.selectAll("rect button3").data(["circular layout"]).enter().append('g')
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


		var bt4 = svg_catalyst.selectAll("rect button4").data(["random layout"]).enter().append('g')
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
	



		var bt5 = svg_catalyst.selectAll("rect button5").data(["degree metric"]).enter().append('g')
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

		/*
		var bt6 = svg_catalyst.selectAll("rect button6").data(["analyse"]).enter().append('g')
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
		*/

		var bt7 = svg_catalyst.selectAll("rect button7").data(["analyse selection"]).enter().append('g')
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

	}

	var addInterfaceSubstrate = function()
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

	}




	var loadData = function(json)
	{
		//d3.json(tulip_address+"?n=50", function(json) {
		//d3.json(json_address, function(data) {

		//for local use
		if (json=="" || json==null)
		{
			var jqxhr = $.getJSON(json_address, function(){ 
			  console.log("success");
			})

			.error(function(e) { alert("error!!", e); })
			.complete(function() { console.log("complete"); })
			.success(function(data,b) { 
				//console.log('json loaded')
				//console.log(data)
				addBaseID(data, "id")
				//convertLinks(data)
				jsonData = JSON.stringify(data)
				loadJSON(data)
				//console.log('sending to tulip... :')
				//console.log(jsonData)
				createTulipGraph(jsonData)
			});
		}
		else
		{
			//console.log('we should now send it as we have it:')
			//console.log(json)
			data = $.parseJSON(json)
			//data = eval(json)
			//console.log('###############################################################################################################################################################################')
			//console.log('data loaded:')
			//console.log(data);
			addBaseID(data, "id")
			json = JSON.stringify(data)
			loadJSON(data)
			createTulipGraph(json)
		}
	}
	addInterfaceSubstrate();
	addInterfaceCatalyst();
	loadData(originalJSON);
	


	//*************************************************************************************************************************
	//hereafter lays some deprecated code


	var graphToJSON_deprecated = function()
	{
		console.log("The node selection= ");
		var u = d3.selectAll("circle.node.selected").data();

		var toStringify = {};
		toStringify.nodes = new Array();

		for (i=0; i<u.length; i++)
		{
			var node = {};
			node.name = u[i].name;
			console.log(u[i]);
			toStringify.nodes.push(node);
		}
		console.log(JSON.stringify(toStringify));
		return JSON.stringify(toStringify)

	};

	var callLayout_d3_force = function(layoutName)
	{

		var params = {type:"layout", name:layoutName}
	

		$.post(tulip_address, {type:'algorithm', parameters:JSON.stringify(params)}, function(data){


		  rescaleGraph(data)

			/*
			force_substrate
			      .nodes(data.nodes)
			      .links(data.links)
			      .start()
			      .stop();*/
			/*
			var link = svg_substrate.selectAll("link.line")
			      .data(data.links).transition()
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; })
			*/			//.exit().remove()

		/*
			var node = svg_substrate.selectAll("node")
				.transition()
				.attr("transform", function(d) { console.log("to change layout: ",d); return "translate(" + 200 + "," + 200 + ")"; })
*/

			var node = svg_substrate.selectAll()
				.transition()
				.attr("cx", function(d){console.log("I'm supposed to move!"); return 200})
			console.log(svg_substrate)


			/*	
			      .data(data.nodes).transition()
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })
			*/
				//.exit().remove()
			      //.call(force_substrate.drag)

		console.log("layout recieved and drawn");
		//displayText();

			

			//d3.selectAll("circle.node.selected").data(old).exit().remove()
			/*enter().append("circle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.style("fill","purple")
			.classed("selected", 0);*/
		});
	};


	var displayText_d3_force = function()
	{
		console.log("displaying text");
		var nodes = svg_substrate.selectAll("circle.node")
		nodes.append("text")
			//.attr("dx", function(d) { return d.children ? -8 : 8; })
			.attr("dx", 100)
			.attr("dy", 100)
			//.attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
			.text(function(d) { console.log(d); console.log("here"); return 'hello'; })
			.style("fill", "#555").style("font-family", "Arial").style("font-size", 12);
		console.log("text displayed");
		console.log(nodes)
	}

	var createTulipGraph_d3_force = function(json)
	{
		$.post(tulip_address, { type:"creation", graph:json }, function(data){

			var link = svg_substrate.selectAll("link.line")
			      .data(data.links).transition()
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
				//.exit().remove()

		
			var node = svg_substrate.selectAll("node.circle")
			      .data(data.nodes).transition()
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
				//.exit().remove()
			      //.call(force_substrate.drag)
		});
	}

	var addInteraction_d3_force = function()
	{
	  var link = svg_substrate.selectAll("line.link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
	      .on("mouseover", function(){d3.select(this).style("fill","red");});

	  var node = svg_substrate.selectAll("circle.node")
	      .attr("r", 5)
	      .attr("id", function(d, i) {return i;})
	      .style("fill", function(d) { return color(d.group); })
	      .on("click", function(){
			var o = d3.select(this); 
			if (o.classed("selected"))
			{
			  o.classed("selected",0).style("fill","steelblue");
			}else{
			  o.classed("selected",1).style("fill","red");
			}
	       })
	      .on("mouseover", function(){d3.select(this).style("fill","yellow"); })
	      .on("mouseout",function(){
			var o = d3.select(this); 
			if (o.classed("selected")) 
			{
				o.style("fill","red");
			}else{
				o.style("fill","steelblue");
			}
	      });
	}

	var drawGraph_d3_force = function(data, force)
	{
		console.log("this is to draw: ")
		console.log(data)

		data.nodes.forEach(function(d){console.log(d.x);})
		rescaleGraph(data)

		force
		      .nodes(data.nodes)
		      .links(data.links)
		      .start()
		      .stop();

		
		var link = svg_catalyst.selectAll("line.link")
				.data(data.links)
				.enter().append("line")
				.attr("class", "link")
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; })
				.style("stroke-width", function(d) { return Math.sqrt(d.value); })
				
		

		
		var node = svg_catalyst.selectAll("circle.node")
				.data(data.nodes).enter().append("circle")
				.attr("class", "node")
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })
				.attr("r", 5)
				.attr("id", function(d, i) {return i;})
				.style("fill", function(d) { return "red" })
				.call(force.drag)
			

		//d3.selectAll("circle.node.selected").data(old).exit().remove()
		/*enter().append("circle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.style("fill","purple")
			.classed("selected", 0);*/


	}

	var analyseGraph_d3_force = function()
	{
	  	var params = {type:"analyse"}
	

		$.post(tulip_address, {type:'analyse'}, function(data){
			console.log("received data after analysis:")
			console.log(data);
			convertLinks(data);
			//data.links.forEach(function (d){d.weight = 1;});
			drawGraph(data, force_catalyst);
		});

	}

	var createGraph_deprecated = function(json)
	{
	  var n = json.nodes.length;
	  var ox = 0, oy = 0;
	  json.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
	  ox = ox / n - width / 2, oy = oy / n - height / 2;
	  json.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });

	  force_substrate
	      .nodes(json.nodes)
	      .links(json.links)
	      .start()
	      .stop();

	  var link = svg_substrate.selectAll("line.link")
	      .data(json.links)
	      .enter().append("line")
	      .attr("class", "link")
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; })
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
	      .on("mouseover", function(){d3.select(this).style("fill","red");});

	  var node = svg_substrate.selectAll("circle.node")
	      .data(json.nodes)
	      .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 5)
	      .attr("id", function(d, i) {return i;})
	      .attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; })
	      .style("fill", function(d) { return color(d.group); })
	      .call(force_substrate.drag)
	      .on("click", function(){
			var o = d3.select(this); 
			if (o.classed("selected"))
			{
			o.classed("selected",0).style("fill","steelblue");
			}else{
			o.classed("selected",1).style("fill","red");
			}
		})
	      .on("mouseover", function(){d3.select(this).style("fill","yellow"); })
	      .on("mouseout",function(){
		var o = d3.select(this); 
		if (o.classed("selected")) 
		{
			o.style("fill","red");
		}else{
			o.style("fill","steelblue");
		}
	      });

	  node.append("title")
	     .text(function(d) { return d.name; });
	}


	var loadJSON_d3_force = function(data)
	{
		force_substrate
			.nodes(data.nodes)
			.links(data.links)
			.start()
			.stop();

		var link = svg_substrate.selectAll("link")
			.data(data.links).enter().append("g").attr("class", "link")
			.on("mouseover", function(){d3.select(this).style("fill","red");});

		link.append("line").attr("class", "link.line")
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })
			.style("stroke-width", function(d) { return Math.sqrt(d.value); })
	      		

		var node = svg_substrate.selectAll("node")
			.data(data.nodes).enter().append("g")
			.attr("class", "node")
			//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

			.on("click", function(){
				var o = d3.select(this); 
				if (o.classed("selected"))
				{
					o.classed("selected",0)
					o.select("circle").style("fill","steelblue");
				}else{
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

		
		node.append("circle").attr("class", "node.circle")
			.attr("cx", function(d){return d.x})
			.attr("cy", function(d){return d.y})
			.attr("r", 5)
			.style("fill", "steelblue")
			.call(force_substrate.drag)
			

		node.append("svg:text").attr("class", "node.text")
			.attr("dx", function(d){return d.x})
			.attr("dy", function(d){return d.y})
			.style("stroke", "black")
			.style("stroke-width", 0.5)
			.style("font-family", "Arial")
			.style("font-size", 12)
			.text(function(d) { console.log(d); return d.label; });	

	}


	var sendSelection_d3_force = function(json)
	{
		$.post(tulip_address, { type:"update", graph:json }, function(data){
			var old = d3.selectAll("node.circle.selected").data();
			/*for (i=0; i<old.length; i++)
			{
				old[i].x = data.nodes[i].x
				old[i].y = data.nodes[i].y
			}*/
			console.log(data);

		  var n = data.nodes.length;
		  var ox = 0, oy = 0;
		  data.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
		  ox = ox / n - width / 2, oy = oy / n - height / 2;
		  data.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });


			force_substrate
			      .nodes(data.nodes)
			      .links(data.links)
			      .start()
			      .stop();

			var link = svg_substrate.selectAll("link.line")
			      .data(data.links)
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
				.exit().remove()

		
			var node = svg_substrate.selectAll("node.circle")
			      .data(data.nodes)
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
				.exit().remove()
			      .call(force_substrate.drag)
			
		});

	};

	var convertLinks_deprecated = function(data)
	{
		//console.log(data)
		var nodeId = []
		data.nodes.forEach(function(d, i){nodeId.push(d.baseID);})
		//console.log(nodeId)
		data.links.forEach(function(d){d.source=nodeId.indexOf(d.source); d.target=nodeId.indexOf(d.target);})
	}


	var callFloatAlgorithm_d3_force = function(floatAlgorithmName)
	{

		var params = {type:"float", name:floatAlgorithmName}
	

		$.post(tulip_address, {type:'algorithm', parameters:JSON.stringify(params)}, function(data){
			var old = d3.selectAll("node.circle.selected").data();
			/*for (i=0; i<old.length; i++)
			{
				old[i].x = data.nodes[i].x
				old[i].y = data.nodes[i].y
			}*/
			console.log(data);

		  var n = data.nodes.length;
		  var ox = 0, oy = 0;
		  data.nodes.forEach(function(d) { ox += d.x, oy += d.y; });
		  ox = ox / n - width / 2, oy = oy / n - height / 2;
		  data.nodes.forEach(function(d) { d.x -= ox, d.y -= oy; });


			force_substrate
			      .nodes(data.nodes)
			      .links(data.links)
			      .start()
			      .stop();

			var link = svg_substrate.selectAll("link.line")
			      .data(data.links)
		.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; })
				.exit().remove()

		
			var node = svg_substrate.selectAll("node.circle")
			      .data(data.nodes)
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("r", function(d) { return d.viewMetric; })
				.exit().remove()
			      .call(force_substrate.drag)
			

			//d3.selectAll("circle.node.selected").data(old).exit().remove()
			/*enter().append("circle")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.style("fill","purple")
			.classed("selected", 0);*/
		});
	};





};
