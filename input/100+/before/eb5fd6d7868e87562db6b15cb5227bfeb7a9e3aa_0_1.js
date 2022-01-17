function(/*DomNode*/ aroundNode, /*Array*/positions){
			// summary:
			//		Pop up the tooltip and point to aroundNode using the best position
			// positions:
			//		Ordered list of positions to try matching up.
			//
			//		- before: places drop down before the aroundNode
			//		- after: places drop down after the aroundNode
			//		- above-centered: drop down goes above aroundNode
			//		- below-centered: drop down goes below aroundNode

			var domNode = this.domNode;
			var connectorClasses = {
				"MRM": "mblTooltipAfter",
				"MLM": "mblTooltipBefore",
				"BMT": "mblTooltipBelow",
				"TMB": "mblTooltipAbove",
				"BLT": "mblTooltipBelow",
				"TLB": "mblTooltipAbove",
				"BRT": "mblTooltipBelow",
				"TRB": "mblTooltipAbove",
				"TLT": "mblTooltipBefore",
				"TRT": "mblTooltipAfter",
				"BRB": "mblTooltipAfter",
				"BLB": "mblTooltipBefore"
			};
			domClass.remove(domNode, ["mblTooltipAfter","mblTooltipBefore","mblTooltipBelow","mblTooltipAbove"]);
			array.forEach(registry.findWidgets(domNode), function(widget){
				if(widget.height == "auto" && typeof widget.resize == "function"){
					if(!widget.fixedFooterHeight){
						widget.fixedFooterHeight = domGeometry.getPadBorderExtents(domNode).b;
					}
					widget.resize();
				}
			});
			var best = place.around(domNode, aroundNode, positions || ['below-centered', 'above-centered', 'after', 'before'], this.isLeftToRight());
			var connectorClass = connectorClasses[best.corner + best.aroundCorner.charAt(0)] || '';
			domClass.add(domNode, connectorClass);
			var pos = domGeometry.position(aroundNode, true);
			domStyle.set(this.anchor, (connectorClass == "mblTooltipAbove" || connectorClass == "mblTooltipBelow")
				? { top: "", left: Math.max(0, pos.x - best.x + (pos.w >> 1) - (this.arrow.offsetWidth >> 1)) + "px" }
				: { left: "", top: Math.max(0, pos.y - best.y + (pos.h >> 1) - (this.arrow.offsetHeight >> 1)) + "px" }
			);
			domClass.replace(domNode, "mblTooltipVisible", "mblTooltipHidden");
			this.resize = lang.hitch(this, "show", aroundNode, positions); // orientation changes
			return best;
		}