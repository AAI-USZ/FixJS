function dragArrow(element, node){
			var arrow,
				cx,
				cy,
				ofsetX,
				ofsetY,
				sourceNode,
				bbox,
				start = function start(){
					if(gui.view.mode === "CF"){
						var canvas = $(gui.view.paper.canvas);
						ofsetX = parseInt(canvas.offset().left) + parseInt(canvas.css("border-top-width"));
						ofsetY = parseInt(canvas.offset().top) + parseInt(canvas.css("border-left-width"));
						bbox = this.getBBox();
						cx = (bbox.x + bbox.x2) / 2;
						cy = (bbox.y + bbox.y2) / 2;
						sourceNode = gui.view.getNodeById(this.node.classList[0]);

						arrow = gui.view.paper.arrow(cx, cy, cx, cy, 4);
					}
				},
				move = function(a, b, c, d, event){
					if(gui.view.mode === "CF"){
						// todo awizowanie arrow po najechaniu na node
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}
						
						arrow = gui.view.paper.arrow(cx, cy, event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY, 4);
						arrow[0].attr({"stroke-dasharray": ["--"]});
					}
				},
				stop = function(event){
					if(gui.view.mode === "CF"){
						try {
							arrow[0].remove();
							arrow[1].remove();
						} catch(e){
							console.log(e);
						}

						var targetNode = gui.view.getNodesInsideRect(event.clientX-ofsetX + window.scrollX, event.clientY - ofsetY + window.scrollY);
						if(targetNode && sourceNode && targetNode.id !== sourceNode.id)
							gui.controler.reactOnEvent("AddCFEdge", {
							 	source: sourceNode,
							 	target: targetNode,
							 	CF_or_DF: "CF"
							 	// type: 
							})
					}
				}
				;

				// alert(element+":"+element.getType())
			if(getType(element) === "Array"){
				$.each(element, function(){
					// alert(this +":"+ this.getType());
					// console.log( this );
					this.drag(move, start, stop);
				})
			} else
				element.drag(move, start, stop);
		}