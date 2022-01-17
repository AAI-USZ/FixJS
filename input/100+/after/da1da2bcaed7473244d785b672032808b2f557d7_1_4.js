function drag(element, node){
			var	lastDragX,
				lastDragY,
				ox, dx,
				oy, dy,
				width, height,
				rWidth = gui.view.paper.width,
				rHeight = gui.view.paper.height,
				bbox,
				ctrl,
				transX, transY,
				flag = true,
				ready2move = false,
				itWasJustAClick = false,
				move = function move(x,y){
					if(ready2move){
						itWasJustAClick = false;
						dx = x - lastDragX;	// mouse x
						dy = y - lastDragY; // mouse y
						
						transX = ox + dx > rWidth-width ? rWidth-width-ox : (ox + dx < 0 ? -ox : dx);
						transY = oy + dy > rHeight-height ? rHeight-height-oy : (oy + dy < 0 ? -oy : dy);
	
						// console.log(transX+":"+transY)
						if(transX != 0 || transY != 0){
					  		$.each(gui.view.graph_view.nodes, function(i, val){
								if(val.highlighted){
									val.translate(transX, transY);
								}
							});
						  	
							lastDragX = x;
							lastDragY = y;
							ox += transX;
							oy += transY;

							gui.controler.reactOnEvent("NodeMoved");
						}
				 	}
				},
				start = function start(x,y,evt){
					itWasJustAClick = true;
					lastDragX = 0;
					lastDragY = 0;
					bbox = node.set.getBBox();
					width = bbox.width;
					height = bbox.height;
					ox = bbox.x;
					oy = bbox.y;

					flag = false;
					if(!node.highlighted){
						if(!evt.ctrlKey)
							gui.controler.reactOnEvent("DESELECT");

						flag = true;
						node.highlight2();
					}
					ready2move = node.highlighted;
					ctrl = evt.ctrlKey;
				},
				stop = function stop(x,y,evt){
					ready2move = false;
					if(itWasJustAClick){
						if(ctrl){
							if(!flag) {
								node.highlight(ctrl);
								//alert("");
							}
						}
						else {
							gui.controler.reactOnEvent("DESELECT");
							node.highlight2();
						}
					}
				}

				if(getType(element) === "Array"){
					$.each(element, function(){
						this.drag(move, start, stop);
					})
				} else
					element.drag(move, start, stop);
		}