function(e){
						if( disabled() || mdownOnHandle || grabbingNode || this.hasClass("ui-cytoscape-edgehandles-preview") ){
							return; // don't override existing handle that's being dragged
							// also don't trigger when grabbing a node
						} 
						
						// console.log("node mouseover");
						
						var node = this;
						var source = this;
						var p = node.renderedPosition();
						var h = node.renderedHeight();
						
						// remove old handle
						safelyRemoveCySvgChild( handle );
						
						hx = p.x;
						hy = p.y - h/2;
						hr = options().handleSize/2;
						
						// add new handle
						handle = svg.circle(hx, hy, hr, {
							fill: options().handleColor
						});
						var $handle = $(handle);
						
						function mdownHandler(e){
							if( e.button != 0 ){
								return; // sorry, no right clicks allowed 
							}
							
//							console.log("-- mdownHandler %o --", e);
							
							mdownOnHandle = true;
							
							e.preventDefault();
							node.unbind("mouseout", removeHandler);
							$handle.unbind("mouseout", removeHandler);
							
							node.addClass("ui-cytoscape-edgehandles-source");
							
							function doneMoving(dmEvent){
//								console.log("doneMoving %o", dmEvent);
								
								if( !mdownOnHandle ){
									return;
								}
								
								var $this = $(this);
								mdownOnHandle = false;
								$(window).unbind("mousemove", moveHandler);
								
								makeEdges();
								resetToDefaultState();
								
								options().stop( node );
							}
							
							$(window).one("mouseup blur", doneMoving).bind("mousemove", moveHandler);
							cy.zoomingEnabled(false).panningEnabled(false);
							
							options().start( node );
						}
						
						function moveHandler(e){
							// console.log("move");
							
							var x = e.pageX - $container.offset().left;
							var y = e.pageY - $container.offset().top;
							
							safelyRemoveCySvgChild( line );
							
							var style = {
								stroke: options().handleColor,
								strokeWidth: options().handleLineWidth,
								fill: "none",
								"pointer-events": "none"
							};
							
							// draw line based on type
							switch( options().lineType ){
							case "straight":
								
								line = svg.line(hx, hy, x, y, style);
								
								break;
							case "draw":
							default:
								
								if( linePoints == null ){
									linePoints = [ [hx, hy], [x, y] ];
								} else {
									linePoints.push([ x, y ]);
								}
								
								line = svg.polyline(linePoints, style);
								
								break;
							}
							
							
						}
						
						function removeHandler(e){		
							//console.log("remove event", e);
							// return;

							var newTargetIsHandle = e.relatedTarget == handle;
							var newTargetIsNode = e.relatedTarget == node.rscratch("svg"); // TODO plugin shouldn't use ele.rscratch
							
							if( newTargetIsHandle || newTargetIsNode || mdownOnHandle ){
								return; // don't consider mouseout
							}
							
//							console.log("removeHandler %o", e);
							
							node.unbind("mouseout", removeHandler);
							resetToDefaultState();
						}
						
						node.bind("mouseout", removeHandler);
						$handle.bind("mouseout", removeHandler);
						$handle.bind("mousedown", mdownHandler);
						
					}