function drawGraph(graph_json){
			var that = this;
			// console.log(graph_json);
			if(!this.paper){
				console.error("you have to run init() function first");
			}
			else {
				var p = this.paper,
					that = this,
					type,
					visualizedNode,
					tmp
				;
				// this.paper.clear();
				// this.graph_json = {};

				var deployerOutput = gui.controler.deploy(graph_json, p.width);

				var tmpCoords, x, y;
				$.each(graph_json.nodes, function(key, val){
					tmpCoords = deployerOutput.getCoords(val.nodeId);
					if(tmpCoords){
						x = tmpCoords[0];
						y = tmpCoords[1];
					}
					visualizedNode = that.visualiser.visualiseNode( val, x, y );
					if(visualizedNode)
						that.graph_view.nodes.push( visualizedNode );
				});

				$.each(graph_json.nodes, function(key, val){

					// alert(val.nodeId)
					$.each(val.sources, function(){
						that.addCFEdge({
							source: that.getNodeById(this),
							target: that.getNodeById(val.nodeId)
						});
					});
					$.each(val.functionalDescription.inputs, function(){
						if(this && this.source && this.source.length == 2){
							// alert(val.nodeId+":"+this.source);
							// alert(this.source[1]);
							that.addDFEdge({
								sourceId : this.source[0],
								targetId : val.nodeId,
								input : that.getNodeById(val.nodeId).getInputById(this.id),
								output : that.getNodeById(this.source[0]).getOutputById(this.source[1])
							});
						}
					});
				});

				this.switchMode("CF");
			}
		}