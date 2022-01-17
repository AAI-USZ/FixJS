function dragArrow(element, node){
			var arrow,
				cx,
				cy,
				ofsetX,
				ofsetY,
				sourceNode,
				targetId,
				output,
				bbox,
				glows = [],
				paper = gui.view.paper,
				canvas = $(paper.canvas),
				start = function start(){
					ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
					ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
					bbox = this.getBBox();
					cx = (bbox.x + bbox.x2) / 2;
					cy = (bbox.y + bbox.y2) / 2;
					sourceNode = outputView.getNodeById(this.node.classList[0]);
					output = sourceNode.getOutputById(this.node.classList[2]);

					$.each(gui.view.graph_view.nodes, function(i, v){
						$.each(v.inputs, function(){
							if(output && this.dataType === output.dataType && !gui.view.isInputConnected(v.id, this.id)){
								glows.push( this.node.glow({color: "red"}) );
							}
						});						
					});

					arrow = paper.arrow(cx, cy, cx, cy, 4);
				},
				move = function move(a, b, c, d, event){
					// todo awizowanie arrow po najechaniu na node
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}
					arrow = paper.arrow(cx, cy, event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY, 4);
					arrow[0].attr({"stroke-dasharray": ["--"]});
				},
				stop = function stop(event){
					try {
						arrow[0].remove();
						arrow[1].remove();
					} catch(e){
						// console.log(e);
					}

					var resultObj = gui.view.getInputByPosition(event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY);
					// alert(resultObj)
					if( output && sourceNode && resultObj && !gui.view.isInputConnected(resultObj.targetId, resultObj.targetId) ){
						if(resultObj.input.dataType === output.dataType){
							gui.controler.reactOnEvent("AddDFEdge", {
							 	sourceId: sourceNode.id,
							 	targetId: resultObj.targetId,
							 	input: resultObj.input,
							 	output: output,
							 	CF_or_DF: "DF"
							});
						} else {
							gui.controler.reactOnEvent("Error", {msg: "You tried to make connection between input and output od different data types"})
						}
					} else {
					}
					$.each(glows, function(){
						this.remove();
					})
				}
				;

				// alert(element+":"+element.getType())
			if(element.getType() === "Array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		}