function(){
		// summary:
		//		Get width of widest TreeNode, or the width of the Tree itself, whichever is greater,
		//		and then set all TreeNodes to that width, so that selection/hover highlighting
		//		extends to the edge of the Tree (#13141)

		if(this._adjustWidthsTimer){
			this._adjustWidthsTimer.remove();
			delete this._adjustWidthsTimer;
		}

		var maxWidth = 0;
		nodes = [];
		function collect(/*TreeNode*/ parent){
			var node = parent.rowNode;
			node.style.width = "auto";		// erase setting from previous run
			maxWidth = Math.max(maxWidth, node.clientWidth);
			nodes.push(node);
			if(parent.isExpanded){
				array.forEach(parent.getChildren(), collect);
			}
		}
		collect(this.rootNode);
		maxWidth = Math.max(maxWidth, domGeometry.getContentBox(this.domNode).w);	// do after node.style.width="auto"
		array.forEach(nodes, function(node){
			node.style.width = maxWidth + "px";		// assumes no horizontal padding, border, or margin on rowNode
		});
	}