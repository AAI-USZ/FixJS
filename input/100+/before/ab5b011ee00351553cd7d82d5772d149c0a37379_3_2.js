function(
			/*DomNode*/		node,
			/*DomNode || place.__Rectangle*/ anchor,
			/*String[]*/	positions,
			/*Boolean*/		leftToRight,
			/*Function?*/	layoutNode){

			// summary:
			//		Position node adjacent or kitty-corner to anchor
			//		such that it's fully visible in viewport.
			// description:
			//		Place node such that corner of node touches a corner of
			//		aroundNode, and that node is fully visible.
			// anchor:
			//		Either a DOMNode or a __Rectangle (object with x, y, width, height).
			// positions:
			//		Ordered list of positions to try matching up.
			//
			//		- before: places drop down to the left of the anchor node/widget, or to the right in the case
			//			of RTL scripts like Hebrew and Arabic; aligns either the top of the drop down
			//			with the top of the anchor, or the bottom of the drop down with bottom of the anchor.
			//		- after: places drop down to the right of the anchor node/widget, or to the left in the case
			//			of RTL scripts like Hebrew and Arabic; aligns either the top of the drop down
			//			with the top of the anchor, or the bottom of the drop down with bottom of the anchor.
			//		- before-centered: centers drop down to the left of the anchor node/widget, or to the right
			//			 in the case of RTL scripts like Hebrew and Arabic
			//		- after-centered: centers drop down to the right of the anchor node/widget, or to the left
			//			 in the case of RTL scripts like Hebrew and Arabic
			//		- above-centered: drop down is centered above anchor node
			//		- above: drop down goes above anchor node, left sides aligned
			//		- above-alt: drop down goes above anchor node, right sides aligned
			//		- below-centered: drop down is centered above anchor node
			//		- below: drop down goes below anchor node
			//		- below-alt: drop down goes below anchor node, right sides aligned
			// layoutNode: Function(node, aroundNodeCorner, nodeCorner)
			//		For things like tooltip, they are displayed differently (and have different dimensions)
			//		based on their orientation relative to the parent.	 This adjusts the popup based on orientation.
			// leftToRight:
			//		True if widget is LTR, false if widget is RTL.   Affects the behavior of "above" and "below"
			//		positions slightly.
			// example:
			//	|	placeAroundNode(node, aroundNode, {'BL':'TL', 'TR':'BR'});
			//		This will try to position node such that node's top-left corner is at the same position
			//		as the bottom left corner of the aroundNode (ie, put node below
			//		aroundNode, with left edges aligned).	If that fails it will try to put
			//		the bottom-right corner of node where the top right corner of aroundNode is
			//		(ie, put node above aroundNode, with right edges aligned)
			//

			// if around is a DOMNode (or DOMNode id), convert to coordinates
			var aroundNodePos = (typeof anchor == "string" || "offsetWidth" in anchor)
				? domGeometry.position(anchor, true)
				: anchor;

			// Compute position and size of visible part of anchor (it may be partially hidden by ancestor nodes w/scrollbars)
			if(anchor.parentNode){
				// ignore nodes between position:relative and position:absolute
				var sawPosAbsolute = domStyle.getComputedStyle(anchor).position == "absolute";
				var parent = anchor.parentNode;
				while(parent && parent.nodeType == 1 && parent.nodeName != "BODY"){  //ignoring the body will help performance
					var parentPos = domGeometry.position(parent, true),
						pcs = domStyle.getComputedStyle(parent);
					if(/relative|absolute/.test(pcs.position)){
						sawPosAbsolute = false;
					}
					if(!sawPosAbsolute && /hidden|auto|scroll/.test(pcs.overflow)){
						var bottomYCoord = Math.min(aroundNodePos.y + aroundNodePos.h, parentPos.y + parentPos.h);
						var rightXCoord = Math.min(aroundNodePos.x + aroundNodePos.w, parentPos.x + parentPos.w);
						aroundNodePos.x = Math.max(aroundNodePos.x, parentPos.x);
						aroundNodePos.y = Math.max(aroundNodePos.y, parentPos.y);
						aroundNodePos.h = bottomYCoord - aroundNodePos.y;
						aroundNodePos.w = rightXCoord - aroundNodePos.x;
					}
					if(pcs.position == "absolute"){
						sawPosAbsolute = true;
					}
					parent = parent.parentNode;
				}
			}			

			var x = aroundNodePos.x,
				y = aroundNodePos.y,
				width = "w" in aroundNodePos ? aroundNodePos.w : (aroundNodePos.w = aroundNodePos.width),
				height = "h" in aroundNodePos ? aroundNodePos.h : (kernel.deprecated("place.around: dijit.place.__Rectangle: { x:"+x+", y:"+y+", height:"+aroundNodePos.height+", width:"+width+" } has been deprecated.  Please use { x:"+x+", y:"+y+", h:"+aroundNodePos.height+", w:"+width+" }", "", "2.0"), aroundNodePos.h = aroundNodePos.height);

			// Convert positions arguments into choices argument for _place()
			var choices = [];
			function push(aroundCorner, corner){
				choices.push({
					aroundCorner: aroundCorner,
					corner: corner,
					pos: {
						x: {
							'L': x,
							'R': x + width,
							'M': x + (width >> 1)
						   }[aroundCorner.charAt(1)],
						y: {
							'T': y,
							'B': y + height,
							'M': y + (height >> 1)
						   }[aroundCorner.charAt(0)]
					}
				})
			}
			array.forEach(positions, function(pos){
				var ltr =  leftToRight;
				switch(pos){
					case "above-centered":
						push("TM", "BM");
						break;
					case "below-centered":
						push("BM", "TM");
						break;
					case "after-centered":
						ltr = !ltr;
						// fall through
					case "before-centered":
						push(ltr ? "ML" : "MR", ltr ? "MR" : "ML");
						break;
					case "after":
						ltr = !ltr;
						// fall through
					case "before":
						push(ltr ? "TL" : "TR", ltr ? "TR" : "TL");
						push(ltr ? "BL" : "BR", ltr ? "BR" : "BL");
						break;
					case "below-alt":
						ltr = !ltr;
						// fall through
					case "below":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "BL" : "BR", ltr ? "TL" : "TR");
						push(ltr ? "BR" : "BL", ltr ? "TR" : "TL");
						break;
					case "above-alt":
						ltr = !ltr;
						// fall through
					case "above":
						// first try to align left borders, next try to align right borders (or reverse for RTL mode)
						push(ltr ? "TL" : "TR", ltr ? "BL" : "BR");
						push(ltr ? "TR" : "TL", ltr ? "BR" : "BL");
						break;
					default:
						// To assist dijit/_base/place, accept arguments of type {aroundCorner: "BL", corner: "TL"}.
						// Not meant to be used directly.
						push(pos.aroundCorner, pos.corner);
				}
			});

			var position = _place(node, choices, layoutNode, {w: width, h: height});
			position.aroundNodePos = aroundNodePos;

			return position;
		}