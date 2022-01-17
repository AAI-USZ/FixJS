function(domNode){
		if(!domNode || !domNode._dvWidget || !domClass.contains(domNode,"mblView")){
			return;
		}
		var widget = domNode._dvWidget;
		var context = widget.getContext();
		var viewsToUpdate = [];
		var node = domNode;
		var parentNode = node.parentNode;
		
		// See if this View or any ancestor View is not currently visible
		while (node && node.tagName != 'BODY'){
			var pnode = node.parentNode;
			var node_added = false;
			if(domClass.contains(node,"mblView")){
				if(node.style.display == "none" || 
						(node && node._dvWidget && node._dvWidget.dijitWidget &&
						!node._dvWidget.dijitWidget.get('selected'))){
					viewsToUpdate.splice(0, 0, node);
					node_added = true;
				}
				if(pnode && !node_added){
					for(var i=0;i<pnode.children.length;i++){
						var n = pnode.children[i];
						if(domClass.contains(n,"mblView")){
							if(n.style.display != "none" || 
									(n && n._dvWidget && n._dvWidget.dijitWidget &&
									n._dvWidget.dijitWidget.get('selected'))){
								viewsToUpdate.splice(0, 0, node);
							}
						}
					}
				}
			}
			node = pnode;
		}
		// Update visibility of any Views that need adjusting
		if(viewsToUpdate.length > 0){
			var command = new CompoundCommand();
			for(var v=0;v<viewsToUpdate.length;v++){
				var viewNode = viewsToUpdate[v];
				this._makeVisible(viewNode, command);
			}
			context.getCommandStack().execute(command);
		}
		if(context.sceneManagers && context.sceneManagers.DojoMobileViews){
			context.sceneManagers.DojoMobileViews._viewSelectionChanged(parentNode._dvWidget, widget);
		}
	}