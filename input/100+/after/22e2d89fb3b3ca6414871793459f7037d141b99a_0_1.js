function(evt)
	{
		if (!started) return;
		if(evt.button === 1 || canvas.spaceKey) return;

		var selected = selectedElements[0],
			pt = transformPoint( evt.pageX, evt.pageY, root_sctm ),
			mouse_x = pt.x * current_zoom,
			mouse_y = pt.y * current_zoom,
			shape = getElem(getId());

		var real_x = x = mouse_x / current_zoom;
		var real_y = y = mouse_y / current_zoom;

		if(curConfig.gridSnapping){
			x = snapToGrid(x);
			y = snapToGrid(y);
		}

		evt.preventDefault();
		
		switch (current_mode)
		{
			case "select":
				// we temporarily use a translate on the element(s) being dragged
				// this transform is removed upon mousing up and the element is 
				// relocated to the new location
				if (selectedElements[0] !== null) {
					var dx = x - start_x;
					var dy = y - start_y;
					
					if(curConfig.gridSnapping){
						dx = snapToGrid(dx);
						dy = snapToGrid(dy);
					}

					if(evt.shiftKey) { var xya = snapToAngle(start_x,start_y,x,y); x=xya.x; y=xya.y; }

					if (dx != 0 || dy != 0) {
						var len = selectedElements.length;
						for (var i = 0; i < len; ++i) {
							var selected = selectedElements[i];
							if (selected == null) break;
//							if (i==0) {
//								var box = svgedit.utilities.getBBox(selected);
// 									selectedBBoxes[i].x = box.x + dx;
// 									selectedBBoxes[i].y = box.y + dy;
//							}

							// update the dummy transform in our transform list
							// to be a translate
							var xform = svgroot.createSVGTransform();
							var tlist = getTransformList(selected);
							// Note that if Webkit and there's no ID for this
							// element, the dummy transform may have gotten lost.
							// This results in unexpected behaviour
							
							xform.setTranslate(dx,dy);
							if(tlist.numberOfItems) {
								tlist.replaceItem(xform, 0);
							} else {
								tlist.appendItem(xform);
							}
							
							// update our internal bbox that we're tracking while dragging
							selectorManager.requestSelector(selected).resize();
						}
						
						call("transition", selectedElements);
					}
				}
				break;
			case "multiselect":
				real_x *= current_zoom;
				real_y *= current_zoom;
				assignAttributes(rubberBox, {
					'x': Math.min(r_start_x, real_x),
					'y': Math.min(r_start_y, real_y),
					'width': Math.abs(real_x - r_start_x),
					'height': Math.abs(real_y - r_start_y)
				},100);

				// for each selected:
				// - if newList contains selected, do nothing
				// - if newList doesn't contain selected, remove it from selected
				// - for any newList that was not in selectedElements, add it to selected
				var elemsToRemove = [], elemsToAdd = [],
					newList = getIntersectionList(),
					len = selectedElements.length;
				
				for (var i = 0; i < len; ++i) {
					var ind = newList.indexOf(selectedElements[i]);
					if (ind == -1) {
						elemsToRemove.push(selectedElements[i]);
					}
					else {
						newList[ind] = null;
					}
				}
				
				len = newList.length;
				for (i = 0; i < len; ++i) { if (newList[i]) elemsToAdd.push(newList[i]); }
				
				if (elemsToRemove.length > 0) 
					canvas.removeFromSelection(elemsToRemove);
				
				if (elemsToAdd.length > 0) 
					addToSelection(elemsToAdd);
					
				break;
			case "resize":
				// we track the resize bounding box and translate/scale the selected element
				// while the mouse is down, when mouse goes up, we use this to recalculate
				// the shape's coordinates
				var tlist = getTransformList(selected),
					hasMatrix = hasMatrixTransform(tlist),
					box = hasMatrix ? init_bbox : svgedit.utilities.getBBox(selected), 
					left=box.x, top=box.y, width=box.width,
					height=box.height, dx=(x-start_x), dy=(y-start_y);
				
				if(curConfig.gridSnapping){
					dx = snapToGrid(dx);
					dy = snapToGrid(dy);
					height = snapToGrid(height);
					width = snapToGrid(width);
				}

				// if rotated, adjust the dx,dy values
				var angle = getRotationAngle(selected);
				if (angle) {
					var r = Math.sqrt( dx*dx + dy*dy ),
						theta = Math.atan2(dy,dx) - angle * Math.PI / 180.0;
					dx = r * Math.cos(theta);
					dy = r * Math.sin(theta);
				}

				// if not stretching in y direction, set dy to 0
				// if not stretching in x direction, set dx to 0
				if(current_resize_mode.indexOf("n")==-1 && current_resize_mode.indexOf("s")==-1) {
					dy = 0;
				}
				if(current_resize_mode.indexOf("e")==-1 && current_resize_mode.indexOf("w")==-1) {
					dx = 0;
				}				
				
				var ts = null,
					tx = 0, ty = 0,
					sy = height ? (height+dy)/height : 1, 
					sx = width ? (width+dx)/width : 1;
				// if we are dragging on the north side, then adjust the scale factor and ty
				if(current_resize_mode.indexOf("n") >= 0) {
					sy = height ? (height-dy)/height : 1;
					ty = height;
				}
				
				// if we dragging on the east side, then adjust the scale factor and tx
				if(current_resize_mode.indexOf("w") >= 0) {
					sx = width ? (width-dx)/width : 1;
					tx = width;
				}
				
				// update the transform list with translate,scale,translate
				var translateOrigin = svgroot.createSVGTransform(),
					scale = svgroot.createSVGTransform(),
					translateBack = svgroot.createSVGTransform();

				if(curConfig.gridSnapping){
					left = snapToGrid(left);
					tx = snapToGrid(tx);
					top = snapToGrid(top);
					ty = snapToGrid(ty);
				}

				translateOrigin.setTranslate(-(left+tx),-(top+ty));
				if(evt.shiftKey) {
					if(sx == 1) sx = sy
					else sy = sx;
				}
				scale.setScale(sx,sy);
				
				translateBack.setTranslate(left+tx,top+ty);
				if(hasMatrix) {
					var diff = angle?1:0;
					tlist.replaceItem(translateOrigin, 2+diff);
					tlist.replaceItem(scale, 1+diff);
					tlist.replaceItem(translateBack, 0+diff);
				} else {
					var N = tlist.numberOfItems;
					tlist.replaceItem(translateBack, N-3);
					tlist.replaceItem(scale, N-2);
					tlist.replaceItem(translateOrigin, N-1);
				}

				selectorManager.requestSelector(selected).resize();
				
				call("transition", selectedElements);
				
				break;
			case "zoom":
				real_x *= current_zoom;
				real_y *= current_zoom;
				assignAttributes(rubberBox, {
					'x': Math.min(r_start_x*current_zoom, real_x),
					'y': Math.min(r_start_y*current_zoom, real_y),
					'width': Math.abs(real_x - r_start_x*current_zoom),
					'height': Math.abs(real_y - r_start_y*current_zoom)
				},100);			
				break;
			case "text":
				assignAttributes(shape,{
					'x': x,
					'y': y
				},1000);
				break;
			case "line":
				// Opera has a problem with suspendRedraw() apparently
				var handle = null;
				if (!window.opera) svgroot.suspendRedraw(1000);

				if(curConfig.gridSnapping){
					x = snapToGrid(x);
					y = snapToGrid(y);
				}

				var x2 = x;
				var y2 = y;					

				if(evt.shiftKey) { var xya = snapToAngle(start_x,start_y,x2,y2); x2=xya.x; y2=xya.y; }
				
				shape.setAttributeNS(null, "x2", x2);
				shape.setAttributeNS(null, "y2", y2);
				if (!window.opera) svgroot.unsuspendRedraw(handle);
				break;
			case "foreignObject":
				// fall through
			case "square":
				// fall through
			case "rect":
			case "image":
				var square = (current_mode == 'square') || evt.shiftKey,
					w = Math.abs(x - start_x),
					h = Math.abs(y - start_y),
					new_x, new_y;
				if(square) {
					w = h = Math.max(w, h);
					new_x = start_x < x ? start_x : start_x - w;
					new_y = start_y < y ? start_y : start_y - h;
				} else {
					new_x = Math.min(start_x,x);
					new_y = Math.min(start_y,y);
				}
				if (evt.altKey){
				  w *=2;
				  h *=2; 
				  new_x = start_x - w/2;
				  new_y = start_y - h/2;
				}
	
				if(curConfig.gridSnapping){
					w = snapToGrid(w);
					h = snapToGrid(h);
					new_x = snapToGrid(new_x);
					new_y = snapToGrid(new_y);
				}

				assignAttributes(shape,{
					'width': w,
					'height': h,
					'x': new_x,
					'y': new_y
				},1000);
				
				break;
			case "circle":
				var c = $(shape).attr(["cx", "cy"]);
				var cx = c.cx, cy = c.cy,
					rad = Math.sqrt( (x-cx)*(x-cx) + (y-cy)*(y-cy) );
				if(curConfig.gridSnapping){
					rad = snapToGrid(rad);
				}
				shape.setAttributeNS(null, "r", rad);
				break;
			case "ellipse":
				var c = $(shape).attr(["cx", "cy"]);
				var cx = Math.abs(start_x + (x - start_x)/2)
				var cy = Math.abs(start_y + (y - start_y)/2);
 
				// Opera has a problem with suspendRedraw() apparently
					handle = null;
				if (!window.opera) svgroot.suspendRedraw(1000);
				if(curConfig.gridSnapping){
					x = snapToGrid(x);
					cx = snapToGrid(cx);
					y = snapToGrid(y);
					cy = snapToGrid(cy);
				}
				var rx = Math.abs(start_x - cx)
				var ry = Math.abs(start_y - cy);
        if (evt.shiftKey) {
          ry = rx
          cy = (y > start_y) ? start_y + rx : start_y - rx
          
        }
        if (evt.altKey) {
          cx = start_x
          cy = start_y
          rx = Math.abs(x - cx)
  				ry = evt.shiftKey ? rx : Math.abs(y - cy);
        }
				shape.setAttributeNS(null, "rx", rx );
				shape.setAttributeNS(null, "ry", ry );
				shape.setAttributeNS(null, "cx", cx );
				shape.setAttributeNS(null, "cy", cy );
				if (!window.opera) svgroot.unsuspendRedraw(handle);
				break;
			case "fhellipse":
			case "fhrect":
				freehand.minx = Math.min(real_x, freehand.minx);
				freehand.maxx = Math.max(real_x, freehand.maxx);
				freehand.miny = Math.min(real_y, freehand.miny);
				freehand.maxy = Math.max(real_y, freehand.maxy);
			// break; missing on purpose
			case "fhpath":
				d_attr += + real_x + "," + real_y + " ";
				shape.setAttributeNS(null, "points", d_attr);
				break;
			// update path stretch line coordinates
			case "path":
				// fall through
			case "pathedit":
				x *= current_zoom;
				y *= current_zoom;
				
				if(curConfig.gridSnapping){
					x = snapToGrid(x);
					y = snapToGrid(y);
					start_x = snapToGrid(start_x);
					start_y = snapToGrid(start_y);
				}
				if(evt.shiftKey) {
					var path = svgedit.path.path;
					if(path) {
						var x1 = path.dragging?path.dragging[0]:start_x;
						var y1 = path.dragging?path.dragging[1]:start_y;
					} else {
						var x1 = start_x;
						var y1 = start_y;
					}
					var xya = snapToAngle(x1,y1,x,y);
					x=xya.x; y=xya.y;
				}
				
				if(rubberBox && rubberBox.getAttribute('display') !== 'none') {
					real_x *= current_zoom;
					real_y *= current_zoom;
					assignAttributes(rubberBox, {
						'x': Math.min(r_start_x*current_zoom, real_x),
						'y': Math.min(r_start_y*current_zoom, real_y),
						'width': Math.abs(real_x - r_start_x*current_zoom),
						'height': Math.abs(real_y - r_start_y*current_zoom)
					},100);	
				}
				pathActions.mouseMove(evt, x, y);
				
				break;
			case "textedit":
				x *= current_zoom;
				y *= current_zoom;
// 					if(rubberBox && rubberBox.getAttribute('display') != 'none') {
// 						assignAttributes(rubberBox, {
// 							'x': Math.min(start_x,x),
// 							'y': Math.min(start_y,y),
// 							'width': Math.abs(x-start_x),
// 							'height': Math.abs(y-start_y)
// 						},100);
// 					}
				
				textActions.mouseMove(mouse_x, mouse_y);
				
				break;
			case "rotate":
				var box = svgedit.utilities.getBBox(selected),
					cx = box.x + box.width/2, 
					cy = box.y + box.height/2,
					m = getMatrix(selected),
					center = transformPoint(cx,cy,m);
				cx = center.x;
				cy = center.y;
				var ccx = box.x // ne
				var ccy = box.y // ne
				if (current_rotate_mode == "nw")  ccx = box.x + box.width;
				if (current_rotate_mode == "se")  ccy = box.y + box.height;
				if (current_rotate_mode == "sw"){ ccx = box.x + box.width; ccy = box.y + box.height;  }
				compensation_angle = ((Math.atan2(cy-ccy,cx-ccx)  * (180/Math.PI))-90) % 360;
				var angle = ((Math.atan2(cy-y,cx-x)  * (180/Math.PI))-90) % 360;
				angle += compensation_angle;
				if(curConfig.gridSnapping){
					angle = snapToGrid(angle);
				}
				if(evt.shiftKey) { // restrict rotations to nice angles (WRS)
					var snap = 45;
					angle= Math.round(angle/snap)*snap;
				}

				canvas.setRotationAngle(angle<-180?(360+angle):angle, true);
				call("transition", selectedElements);
				break;
			default:
				break;
		}
		
		runExtensions("mouseMove", {
			event: evt,
			mouse_x: mouse_x,
			mouse_y: mouse_y,
			selected: selected
		});

	}