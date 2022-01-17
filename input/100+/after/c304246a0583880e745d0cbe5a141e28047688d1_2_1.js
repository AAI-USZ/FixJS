function constructRegularGraph(graphPanel, graph, index){

	if (graph.includedCategories.length > 0){
	/* Number of datapoints N */
		graphPanel.add(pv.Label)
			.right(10)
			.bottom(10)
			.textAlign("center")
			.textAngle(0)
			.textBaseline("bottom")
			.text(function(){return "n = " + graph.n})
			.font(fontString);
			
		/* X-axis ticks */
		graphPanel.add(pv.Rule)
			.data(function() { return graph.x.ticks() })
			.left(function(d) {return graph.x(d)})
			.bottom(graph.baseLine)
			.strokeStyle("#aaa")
			.height(5)
			.anchor("bottom").add(pv.Label)
				.text(function(d) {return d.toFixed(1)})
				.font(function(){return "bold "+graphCollection.tickTextSize+"px sans-serif"})
			
		/* X-axis line */
		graphPanel.add(pv.Rule)
			.bottom(graph.baseLine)
			.strokeStyle("#000");
		
		/* UD Edge of the graph partition lines 
		 * Where new partitions come from 
		 */
		graphPanel.add(pv.Rule)
			.data([{"x":0,"y":0}])
			.left(0)
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.strokeStyle("green")
			.visible(function(){return graph.groupingMode == "UserDefGroups"})
			.anchor("top").add(pv.Dot)
				.left(8)
				.title("Drag to create a new partition.")
				.events("all")
				.cursor("move")
				.shape("square")
				.fillStyle("green")
				.strokeStyle("green")
				.radius(8)
				.event("mousedown", pv.Behavior.drag())
				.event("dragstart", function() {
					graphCollection.selectAUserDefPartition(index, graph.udPartitions.push(vis.mouse())-1)
					if (graph.testMode == "sampling")
						vis.render();
					else
						graphPanel.render();
				})
				.event("drag", function(){
					graph.udPartitions[graph.udPartitions.length-1] = vis.mouse();
					if (graph.testMode == "sampling")
						vis.render();
					else
						graphPanel.render();
				})
				.event("dragend",function(){
					graph.udPartitions[graph.udPartitions.length-1] = vis.mouse();
					if (graph.testMode == "sampling")
						vis.render();
					else
						graphPanel.render();
				}) 
				.event("touchstart", function(event){
					touch.dragType = "partitionCreate";
					touch.graphPanel = graphPanel;
					touch.graphIndex = index;
					touch.dragging = true;
				})
				
		/* User Defined Partitions */
		graphPanel.add(pv.Rule)
			.data(function(){return graph.udPartitions})
			.left(function(d){return d.x})
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.strokeStyle("green")
			.visible(function(){return graph.groupingMode == "UserDefGroups"})
			.anchor("top").add(pv.Dot)
				.left(function(d){return d.x + 8})
				.title(function(d){return graph.x.invert(d.x).toFixed(1)})
				.events("all")
				.cursor("move")
				.shape("square")
				.fillStyle(function() {
					if (graph.selectedUDPart == this.index)  return "yellow";
					else return "green";
				})
				.strokeStyle("green")
				.radius(8)
				.event("mousedown", pv.Behavior.drag())
				.event("dragstart", function() {
					graphCollection.selectAUserDefPartition(index, this.index);
				})
				.event("drag", vis)
				.event("touchstart", function(event){
					touch.dragType = "partitionMove";
					touch.partitionIndex = this.index;
					touch.graphPanel = graphPanel;
					touch.graphIndex = index;
					touch.dragging = true;
				})
			
		
		graphPanel.add(pv.Rule)
			.right(0)
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.strokeStyle("green")
			.visible(function(){return graph.groupingMode == "UserDefGroups"})
			
			
		/* UD Partition Data Count Label */
		graphPanel.add(pv.Label)
			.data(function(){return countDataInUserDefPartitions(graph)})
			.textAlign("center")
			.textStyle("green")
			.bottom(function(){return (graph.h-graph.baseLine) * 0.70 + graph.baseLine})
			.left(function(d){
				var udPartXVals = getSortedUDPartitionXVals(graph);
				if (this.index != udPartXVals.length-1){
					return graph.x((udPartXVals[this.index]+udPartXVals[this.index+1])/2);
				} else return 0;
			})
			.visible(function(){
				var udPartXVals = getSortedUDPartitionXVals(graph);
				return this.index != udPartXVals.length-1 &&
							 graph.groupingMode == "UserDefGroups";
			});


    /* Listeners for user defined partition deletion */
    pv.listen(window, "mousedown", function() {self.focus()});
		pv.listen(window, "keydown", function(e) {
			//code 8 is backspace, code 46 is delete
			if ((e.keyCode == 8 || e.keyCode == 46) && graph.selectedUDPart != null) {
				graph.udPartitions.splice(graph.selectedUDPart, 1);
				graphCollection.selectAUserDefPartition();
				e.preventDefault();
				vis.render();
			}
		});
		
		/* Fixed Interval Width Partitions */
		graphPanel.add(pv.Rule)
			.data(function(){return partitionDataByIntervalWidth(graph)})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.visible(function(){return graph.groupingMode == "FixedIntervalGroups"})
			.strokeStyle("green")
			.title(function(d){return d})
			.anchor("top").add(pv.Dot)
				.title(function(d){return d.toFixed(1)})
				.shape("square")
				.fillStyle("green")
				.strokeStyle("green")
				.size(4);
			
		/*Fixed Interval Width Partitions Size Labels*/
		graphPanel.add(pv.Label)
			.data(function(){return countDataInPartitions(graph,partitionDataByIntervalWidth(graph))})
			.textAlign("center")
			.textStyle("green")
			.bottom(function(){return (graph.h-graph.baseLine) * 0.70 + graph.baseLine})
			.left(function(){
				if (this.index != partitionDataByIntervalWidth(graph).length-1){
					return graph.x((partitionDataByIntervalWidth(graph)[this.index]+partitionDataByIntervalWidth(graph)[this.index+1])/2);
				} else return 0;
			})
			.visible(function(){
				return this.index != partitionDataByIntervalWidth(graph).length-1 &&
							 graph.groupingMode == "FixedIntervalGroups";
			});
			
		/* Fixed Interval Width Histogram */
		graphPanel.add(pv.Bar)
			.data(function(){return fiwHistogram(graph,partitionDataByIntervalWidth(graph))})
			.visible(function(d) { 
				return ( graph.groupingMode == "FixedIntervalGroups" &&
								 graph.histogram
								) 
			})
			.left(function(d){return d.left})
			.bottom(graph.baseLine)
			.height(function(d){return d.height})
			.width(function(d){return d.width})
			.lineWidth(0.5)
			.strokeStyle("green")
			.fillStyle(pv.rgb(0,225,0,0.25));
		
		/* Fixed Group Size Partitions */
		graphPanel.add(pv.Rule)
			.data(function(){return partitionDataInFixedSizeGroups(graph)})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.visible(function(){return graph.groupingMode == "FixedSizeGroups"})
			.strokeStyle("green")
			.title(function(d){return d.toFixed(1)})
			.anchor("top").add(pv.Dot)
				.title(function(d){return d.toFixed(1)})
				.shape("square")
				.fillStyle("green")
				.strokeStyle("green")
				.size(4);
			
		/*Fixed Group Size Partition Labels*/
		graphPanel.add(pv.Label)
			.data(function(){return partitionDataInFixedSizeGroups(graph)})
			.textAlign("center")
			.textStyle("green")
			.bottom(function(){return (graph.h-graph.baseLine) * 0.70 + graph.baseLine})
			.left(function(){
				if (this.index != partitionDataInFixedSizeGroups(graph).length-1){
					return graph.x((partitionDataInFixedSizeGroups(graph)[this.index]+partitionDataInFixedSizeGroups(graph)[this.index+1])/2);
				} else return 0;
			})
			.visible(function(){
				return this.index != partitionDataInFixedSizeGroups(graph).length-1 &&
							 graph.groupingMode == "FixedSizeGroups";
			})
			.text(function(){
				if (graph.dataVals().length % graph.partitionGroupSize == 0 ||
						this.index != partitionDataInFixedSizeGroups(graph).length-2)
					return graph.partitionGroupSize;
				
				else return graph.dataVals().length % graph.partitionGroupSize;
				
			})
		
			
		/* Two Equal Partitions */
		graphPanel.add(pv.Rule)
			.data(function(){return partitionDataInTwo(graph)})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.visible(function(){
				return graph.groupingMode == "TwoEqualGroups" &&
							 !graph.insufDataForTwo;
			})
			.strokeStyle("green")
			.title(function(d){return d.toFixed(1)})
			.anchor("top").add(pv.Dot)
				.title(function(d){return d.toFixed(1)})
				.shape("square")
				.fillStyle("green")
				.strokeStyle("green")
				.size(4);
				
		/*Two Partition Size Labels*/
		graphPanel.add(pv.Label)
			.data(function(){return partitionDataInTwo(graph)})
			.textAlign("center")
			.textStyle("green")
			.bottom(function(){return (graph.h-graph.baseLine) * 0.70 + graph.baseLine})
			.left(function(){
				if (this.index != partitionDataInTwo(graph).length-1){
					return graph.x((partitionDataInTwo(graph)[this.index]+partitionDataInTwo(graph)[this.index+1])/2);
				} else return 0;
			})
			.visible(function(){
				return this.index != partitionDataInTwo(graph).length-1 &&
							 graph.groupingMode == "TwoEqualGroups" &&
							 !graph.insufDataForTwo;
			})
			.text(function(){
				if (graph.dataVals().length % 2 == 0)
					return graph.dataVals().length/2;
				else if(this.index != partitionDataInTwo(graph).length-2)
					return Math.ceil(graph.dataVals().length/2);
				else
					return Math.floor(graph.dataVals().length/2);
				
			})
		
		/*Insufficient Data for Two Warning */	
		graphPanel.add(pv.Label)
			.text("Insufficient data.")
			.textStyle("red")
			.visible(function(){
				return graph.groupingMode == "TwoEqualGroups" &&
							 graph.insufDataForTwo;
			})
			.font(fontString)
			.top(35)
			.left(graph.w/2)
			.textAlign("center")
			
		
		/* Four Equal Partitions */
		graphPanel.add(pv.Rule)
			.data(function(){return partitionDataInFour(graph)})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.visible(function(){return graph.groupingMode == "FourEqualGroups" &&
																 !graph.insufDataForFour;
			})
			.strokeStyle("green")
			.title(function(d){return d.toFixed(1)})
			.anchor("top").add(pv.Dot)
				.title(function(d){return d.toFixed(1)})
				.shape("square")
				.fillStyle("green")
				.strokeStyle("green")
				.visible(function(){return graph.groupingMode == "FourEqualGroups" &&
																	 !graph.insufDataForFour; 
				})
				.size(4);
				
		/*Four Partition Size Labels*/
		graphPanel.add(pv.Label)
			.data(function(){return countDataInPartitions(graph, partitionDataInFour(graph))})
			.textAlign("center")
			.textStyle("green")
			.bottom(function(){return (graph.h-graph.baseLine) * 0.70 + graph.baseLine})
			.left(function(){
				if (this.index != partitionDataInFour(graph).length-1){
					return graph.x((partitionDataInFour(graph)[this.index]+partitionDataInFour(graph)[this.index+1])/2);
				} else return 0;
			})
			.visible(function(){
				return this.index != partitionDataInFour(graph).length-1 &&
							graph.groupingMode == "FourEqualGroups" &&
							!graph.insufDataForFour;
			})
			.text(function(d){
				if (this.index != partitionDataInFour(graph).length-1){
					return d;
				} else return 0;
			})
		
		//Simple Box Plot Lines
		graphPanel.add(pv.Line)
			.data(function(){
				return [[partitionDataInFour(graph)[0], graph.baseLine],
								[partitionDataInFour(graph)[0], graph.h * 0.80]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[4], graph.baseLine],
						 [partitionDataInFour(graph)[4], graph.h * 0.80]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
		})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[2], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[2], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})						

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[0], (graph.h-graph.baseLine) * 0.40 + graph.baseLine],
						 [partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.40 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.60 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.20 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})

		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.40 + graph.baseLine],
						 [partitionDataInFour(graph)[4], (graph.h-graph.baseLine) * 0.40 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
		
		
			
		/* Advanced Box Plot Lines */
		graphPanel.add(pv.Line)
			.data(function(){
				var min = removeOutliers(graph)[0];
				return [[min, graph.baseLine],
						 [min, graph.h * 0.80]]
			})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot && 
																	 !graph.insufDataForFour; 
			})
																	 
		graphPanel.add(pv.Line)
			.data(function(){
				var max = removeOutliers(graph)[removeOutliers(graph).length-1];
				return [[max, graph.baseLine],
						 [max, graph.h * 0.80]]
			})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
																	 
		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
		})
																	 
		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[2], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[2], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
																	 
		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})						
																	 						
		graphPanel.add(pv.Line)
			.data(function(){
				var min = removeOutliers(graph)[0];
				return [[min, (graph.h-graph.baseLine) * 0.40 + graph.baseLine],
						 [partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.40 + graph.baseLine]]
			})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
			
		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.60 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.60 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
			
		graphPanel.add(pv.Line)
			.data(function(){return [[partitionDataInFour(graph)[1], (graph.h-graph.baseLine) * 0.20 + graph.baseLine],
						 [partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.20 + graph.baseLine]]})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
			
		graphPanel.add(pv.Line)
			.data(function(){
				var max = removeOutliers(graph)[removeOutliers(graph).length-1];
				return [[partitionDataInFour(graph)[3], (graph.h-graph.baseLine) * 0.40 + graph.baseLine],
						 [max, (graph.h-graph.baseLine) * 0.40 + graph.baseLine]]
			})
			.left(function(d) { return graph.x(d[0]) })
			.bottom(function(d) { return d[1] })
			.lineWidth(1)
			.strokeStyle("darkgreen")
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot &&
																	 !graph.insufDataForFour; 
			})
			
		//Box Plot Mean
		graphPanel.add(pv.Dot)
			.data(function(){return [graph.getMeanMedianMode()[0]]})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return (graph.h-graph.baseLine) * 0.42 + graph.baseLine})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.insufDataForFour; 
			})
			.shape("cross")
			.strokeStyle("darkgreen")
		
		graphPanel.add(pv.Dot)
			.data(function(){return [graph.getMeanMedianMode()[0]]})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return (graph.h-graph.baseLine) * 0.42 + graph.baseLine})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 !graph.insufDataForFour; 
			})
			.shape("cross")
			.angle(Math.PI/4)
			.strokeStyle("darkgreen")
			
		//Box Plot SD Line
		graphPanel.add(pv.Line)
			.data(function(){return getSDLinePoints(graph)})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return (graph.h-graph.baseLine) * 0.42 + graph.baseLine})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 graph.sdLine &&
																	 !graph.insufDataForFour; 
			})
			.lineWidth(1)
			.strokeStyle("orange")
			
		graphPanel.add(pv.Label)
			.data(function(){return [graph.getMeanMedianMode()[0]]})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return (graph.h-graph.baseLine) * 0.42 + graph.baseLine +20})
			.text(function(){return "SD = "+getSD(graph.dataVals()).toFixed(1)})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 graph.sdLine &&
																	 !graph.insufDataForFour; 
			})
			.textAlign("center")
			.textStyle("orange")
			
			
		graphPanel.add(pv.Line)
			.data(function(){return [getSDLinePoints(graph)[0], getSDLinePoints(graph)[0]]})
			.left(function(d){return graph.x(d)})
			.bottom(function(){ 
				if (this.index==0)
					return (graph.h-graph.baseLine) * 0.43 + graph.baseLine;
				else
					return (graph.h-graph.baseLine) * 0.41 + graph.baseLine;
			})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 graph.sdLine &&
																	 !graph.insufDataForFour; 
			})
			.lineWidth(1)
			.strokeStyle("orange")
			
		graphPanel.add(pv.Line)
			.data(function(){return [getSDLinePoints(graph)[1], getSDLinePoints(graph)[1]]})
			.left(function(d){return graph.x(d)})
			.bottom(function(){ 
				if (this.index==0)
					return (graph.h-graph.baseLine) * 0.43 + graph.baseLine;
				else
					return (graph.h-graph.baseLine) * 0.41 + graph.baseLine;
			})
			.visible(function(){return graph.groupingMode == "BoxPlot" &&
																	 graph.sdLine &&
																	 !graph.insufDataForFour; 
			})
			.lineWidth(1)
			.strokeStyle("orange")
			
		/*Mean Median Mode Lines */
		graphPanel.add(pv.Rule)
			.data(function(){
				graph.getMeanMedianMode().forEach(function(m,i){
					if (i > graph.MMMLabelVis.length-1)
						graph.MMMLabelVis[i] = false;
				});
				return graph.getMeanMedianMode()
			})
			.left(function(d){return graph.x(d)})
			.bottom(function(){return graph.baseLine})
			.height(function(){
				if (this.index == 0)
					return (graph.h-graph.baseLine) * 0.75;
				else if (this.index == 1)
					return (graph.h-graph.baseLine) * 0.70;
				else
					return (graph.h-graph.baseLine) * 0.65;
			})
			.visible(function(){
				if (this.index == 0)
					return graph.showMMM || graph.showMean;
				else if (this.index == 1)
					return graph.showMMM || graph.showMedian;
				else
					return graph.showMMM || graph.showMode;
			})
			.strokeStyle(function(d){
				if(this.index == 0)
					return pv.rgb(255,0,0,0.5);
				else if (this.index == 1)
					return pv.rgb(0,0,255,0.5);
				else
					return pv.rgb(0,255,0,0.5);
			})
			.title(function(d){
				if(this.index == 0)
					return "Mean: " + d.toFixed(1);
				else if (this.index == 1)
					return "Median: " + d.toFixed(1);
				else
					return "Mode: " + d.toFixed(1);
			})
			.anchor("top").add(pv.Dot)
				.title(function(d){
					if(this.index == 0)
						return "Mean: " + d.toFixed(1);
					else if (this.index == 1)
						return "Median: " + d.toFixed(1);
					else
						return "Mode: " + d.toFixed(1);
				})
				.shape(function(d){
					if(this.index == 0)
						return "square";
					else if (this.index == 1)
						return "circle"
					else
						return "triangle";
				})
				.fillStyle(function(d){
					if(this.index == 0)
						return pv.rgb(255,0,0,1);
					else if (this.index == 1)
						return pv.rgb(0,0,255,1);
					else
						return pv.rgb(0,255,0,1);
				})
				.strokeStyle(function(d){
					if(this.index == 0)
						return pv.rgb(255,0,0,0.5);
					else if (this.index == 1)
						return pv.rgb(0,0,255,0.5);
					else
						return pv.rgb(0,255,0,0.5);
				})
				.visible(function(){
					if (this.index == 0)
						return graph.showMMM || graph.showMean;
					else if (this.index == 1)
						return graph.showMMM || graph.showMedian;
					else
						return graph.showMMM || graph.showMode;
				})
				.size(40)
				.event('click', function(){
					graph.MMMLabelVis[this.index] = !(graph.MMMLabelVis[this.index]);
					vis.render();
				})
				
		// Mean, Median, Mode Labels
		graphPanel.add(pv.Label)
			.data(function(){return graph.getMeanMedianMode()})
			.text(function(d){
				if(this.index == 0)
					return "Mean = " + d.toFixed(1);
				else if (this.index == 1)
					return "Median = " + d.toFixed(1);
				else
					return "Mode = " + d.toFixed(1);
			})
			.left(function(d){return graph.x(d)})
			.bottom(function(){
				if (this.index == 0)
					return graph.baseLine + (graph.h-graph.baseLine) * 0.75 + 10;
				else if (this.index == 1)
					return graph.baseLine + (graph.h-graph.baseLine) * 0.70 + 10;
				else
					return graph.baseLine + (graph.h-graph.baseLine) * 0.65 + 10;
			})
			//.bottom(function(d){
				//return graph.baseLine + (graph.h-graph.baseLine) * 0.75 + 5;
			//})
			.textStyle(function(d){
				if(this.index == 0)
					return pv.rgb(255,0,0,0.75);
				else if (this.index == 1)
					return pv.rgb(0,0,255,0.75);
				else
					return pv.rgb(0,255,0,0.75);
			})
			.font(fontString)
			.textAlign("center")
			.visible(function(){
				return graph.MMMLabelVis[this.index] && //graph.showMMM &&
					((this.index == 0) ? graph.showMean : true) &&
					((this.index == 1) ? graph.showMedian : true) &&
					((this.index >= 2) ? graph.showMode : true);
			})
		
		
		/*Insufficient Data for Four Warning */	
		graphPanel.add(pv.Label)
			.text("Insufficient data.")
			.textStyle("red")
			.visible(function(){
				return graph.groupingMode == "FourEqualGroups" &&
							 graph.insufDataForFour;
			})
			.font(fontString)
			.top(35)
			.left(graph.w/2)
			.textAlign("center")
		
		
		//Mouse position label for drag editing
		var dragLabel = graphPanel.add(pv.Label)
			.visible(false)
			.font(fontString)
			.textAlign("center")
			.text("0")
		
		/* Line Mode Lines */
		graphPanel.add(pv.Rule)
			.data(function() {return graph.getDataDrawObjects()})
			.visible(function(d) {
				return $('#checkboxHideData').attr('checked') != "checked"  && 
					d.x >= 0 &&
					d.x <= graph.w &&
					graphCollection.lineMode;
			})
			.left(function(d) { return d.xReal })
			.bottom(function(){return graph.baseLine})
			.height(function(){return (graph.h-graph.baseLine) * 0.75})
			.lineWidth(function(){return graphCollection.bucketDotSize})
			.strokeStyle(function(d) {
				var color = pointFillStyle(d.set); 
				return pv.rgb(color.r, color.g, color.b, 0.3)
			})
			.title(function(d) { return d.label+", "+graph.x.invert(d.xReal).toFixed(1) })
		
		
		/* Dots */
		graphPanel.add(pv.Dot)
			.data(function() {return graph.getDataDrawObjects()})
			.visible(function(d) {
				return $('#checkboxHideData').attr('checked') != "checked"  && 
					(d.y+graph.baseLine) < graph.h &&
					d.x >= 0 &&
					d.x <= graph.w &&
					!graphCollection.lineMode;
			})
			.left(function(d) { return d.x })
			.bottom(function(d) { return d.y + graph.baseLine })
			.cursor(function(){
				if (graphCollection.editModeEnabled)
					return "move";
				else
					return "default";
			})
			.radius(function() {return graphCollection.bucketDotSize})
			.fillStyle(function(d) {return pointFillStyle(d.set)})
			.strokeStyle(function(d) {
				if (d.label == graphCollection.selectedLabel && graph.testMode != "sampling")
					return graphCollection.bwMode ? "grey": "red";
				else if (graph.testMode == "sampling" &&
								 sampleContainsData(graphCollection.data[graph.selectedSample], d, graph))
					return graphCollection.bwMode ? "grey": "blue";
				else
					return pointStrokeStyle(d.set);
			})
			.lineWidth(function(d){
				if (d.label == graphCollection.selectedLabel && graph.testMode != "sampling") return 4;
				else if (graph.testMode == "sampling" &&
								 sampleContainsData(graphCollection.data[graph.selectedSample], d, graph)) return 4;
				else return 2;
			})
			.title(function(d) { return d.label+", "+graph.x.invert(d.xReal).toFixed(1) })
			.event("click", function(d){
				if (graphCollection.editModeEnabled == false && graph.testMode != "sampling")
					graphCollection.selectedLabel = d.label;
				else if (graph.testMode == "sampling"){
					if (!sampleContainsData(graphCollection.data[graph.selectedSample], d, graph)) {
						graphCollection.data[graph.selectedSample].push(
																		{"set":d.set,
																		 "label":d.label,
																		 "value":graph.x.invert(d.xReal)});
						graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany++;
						$("#sampleN"+(index+1)).val(graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany);
																	 
					} else {
						graphCollection.data[graph.selectedSample].splice(sampleIndexOfData(graphCollection.data[graph.selectedSample], d, graph),1);
						graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany--;
						$("#sampleN"+(index+1)).val(graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany);
					}
					graph.samplingTo[graph.selectedSampleNumber-1].updateInsufDataFlags();
				}
				vis.render();
			})
			.event("mousedown", pv.Behavior.drag())
			.event("drag", function(d){  
				if (graphCollection.editModeEnabled &&
						vis.mouse().x >= 0 &&
						vis.mouse().x <= graph.w - 5){
							
					var worksheet = "";
					for (var key in graphCollection.worksheets){
						if (graphCollection.worksheets[key].data[d.set] != undefined)
							worksheet = key;
					}
					
					graphCollection.editSinglePoint(worksheet, d.set,d.label,graph.x.invert(vis.mouse().x));
					graph.selectedCategory = d.set;
					
					dragLabel.text(graph.x.invert(graphPanel.mouse().x).toFixed(1));
					dragLabel.left(graphPanel.mouse().x)
					dragLabel.top(graphPanel.mouse().y - 10)
					dragLabel.visible(true)
					
					vis.render();
				} else {
					dragLabel.text("Delete");
					vis.render();
				}
					
			})
			.event("dragend",function(d){
				if (graphCollection.editModeEnabled){
					var worksheet = "";
					for (var key in graphCollection.worksheets){
						if (graphCollection.worksheets[key].data[d.set] != undefined)
							worksheet = key;
					}
					var newData = graphCollection.worksheets[worksheet].data[d.set];
					var remIndex = null;
					newData.forEach(function(data, index){
						if (data.label == d.label && 
						(vis.mouse().x < 0 ||
						vis.mouse().x > graph.w - 5)){
							remIndex = index;
						}
					});
					if (remIndex != null)
						newData.splice(remIndex,1);
					graphCollection.editData(worksheet,d.set,d.set,newData);
					
				
					if (Math.abs(graphPanel.mouse().x - d.x) <= graphCollection.bucketDotSize &&
							Math.abs((graph.h - graphPanel.mouse().y) - (d.y + graph.baseLine)) <= graphCollection.bucketDotSize+1)
					{
						dragging = true;
					}
					
					dragLabel.visible(false);
					
					if (graph.testMode == "sampling" &&
							sampleContainsData(graphCollection.data[graph.selectedSample], d, graph)){
						graphCollection.data[graph.selectedSample]
													 .splice(sampleIndexOfData(graphCollection.data[graph.selectedSample], d, graph),1);
						graph.samplingTo[graph.selectedSampleNumber-1].updateInsufDataFlags();
						graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany--;
						$("#sampleN"+(index+1)).val(graph.samplingTo[graph.selectedSampleNumber-1].samplingHowMany);
					}
					
					
					vis.render();
				}
			})
			.event("touchstart", function(d){
				touch.dragType = "data";
				touch.dataObj = d;
				touch.graphIndex = index;
				touch.dragging = true;
				touch.dragLabel = dragLabel;
			})
			
		//Advanced Box Plot Outlier Marks
		graphPanel.add(pv.Dot)
			.data(function(){return getOutlierDrawPositions(graph)})
			.visible(function(d){return graph.groupingMode == "BoxPlot" &&
																		graph.advBoxPlot && 
																	 !graph.insufDataForFour &&
																	 (d.y+graph.baseLine) < graph.h &&
																		d.x >= 0 &&
																		d.x <= graph.w;
			})
			.left(function(d) { return d.x })
			.bottom(function(){return (graph.h-graph.baseLine) * 0.42 + graph.baseLine})
			.shape("cross")
			.strokeStyle("darkgreen")
			.size(60)
			.angle(Math.PI/4)
			
		
		//Graph Overflow Warning Message
		graphPanel.add(pv.Label)
			.text("Warning! Data points lie outside graph boundaries.")
			.textStyle("red")
			.font(fontString)
			.top(35)
			.left(function(){return graph.w/2})
			.textAlign("center")
			.visible(function(){
				var retVal = false;
				graph.getDataDrawObjects().forEach(function(d){
					if ((d.y+graph.baseLine) > graph.h ||
							d.x < 0 ||
							d.x > graph.w)
						retVal = true;
				});
				return retVal;
			})
	} else {
		//Empty Graph Message
		graphPanel.add(pv.Label)
			.left(function(){return graph.w/2})
			.top(function(){return graph.h/2})
			.textAlign("center")
			.textBaseline("center")
			.text("Empty Graph")
			.font(fontString)
		graphPanel.add(pv.Label)
			.left(function(){return graph.w/2})
			.top(function(){return graph.h/2 + 20})
			.textAlign("center")
			.textBaseline("center")
			.text("Drag a Dataset from the Left to Add")
			.font(fontString)
		graphPanel.add(pv.Label)
			.left(function(){return graph.w/2})
			.top(function(){return graph.h/2 + 40})
			.textAlign("center")
			.textBaseline("center")
			.text("Maximum 4 Datasets per Graph")
			.font(fontString)
	}
}