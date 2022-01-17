function(){
		
		height = $container.height();
		width = $container.width();
		
// 		$container.cytoscapePanzoom();
		
// 		$container.cytoscapeEdgehandles({
// 			lineType: "straight",
// 			preview: true,
// 			handleSize: 12,
// 			handleColor: "#5CC2ED",
// 			edgeType: function(){
// 				return $("#add-edge-type-select").val();
// 			},
// 			nodeParams: function(){
// 				return {
// 					classes: "intermediate"
// 				};
// 			},
// 			start: function( sourceNode ){
// //				console.log("start(%o)", sourceNode);
// 			},
// 			complete: function( sourceNode, targetNodes, added ){
// //				console.log("complete(%o, %o, %o)", sourceNode, targetNodes, added);
// 			},
// 			stop: function( sourceNode ){
// //				console.log("stop(%o)", sourceNode);
// 			}
// 		});
		
		function number(group){
			var input = $("#" + group + "-number");
			var val = parseInt( input.val() );
			
			if( isNaN(val) ){
				return 0;
			}
			
			return val;
		}
		
		function time(callback){
			var start = new Date();
			callback();
			var end = new Date();
			
			$("#add-remove-time").html( (end - start) + " ms" );
		}
		
		$("#add-elements-button").click(function(){
			var n = number("nodes");
			var e = number("edges");
			
			var nodes = [];
			for(var i = 0; i < n; i++){
				nodes.push({
					group: "nodes",
					data: { id: "n" + (i + numNodes), weight: Math.round( Math.random() * 100 ) },
					position: { x: Math.random() * width, y: Math.random() * height }
				});
			}
			numNodes += n;
			
			cy.add(nodes);
			
			var nodesCollection = cy.nodes();
			function nodeId(){
				var index = Math.round((nodesCollection.size() - 1) * Math.random());
				return nodesCollection.eq(index).data("id");
			}
			
			var edges = [];
			for(var i = 0; i < e; i++){
				edges.push({
					group: "edges",
					data: {
						id: "e" + (i + numEdges), 
						weight: Math.round( Math.random() * 100 ),
						source: nodeId(),
						target: nodeId()
					}
				});
			}
			numEdges += e;
			
			time(function(){
				cy.add(edges);
			});
		});
		
		$("#remove-elements-button").click(function(){
			var n = number("nodes");
			var e = number("edges");
			
			time(function(){
				cy.nodes().slice(0, n).remove();
				cy.edges().slice(0, e).remove();
			});
			

		});
		
		$("#remove-selected-button").click(function(){
			cy.elements(":selected").remove();
		});
	}