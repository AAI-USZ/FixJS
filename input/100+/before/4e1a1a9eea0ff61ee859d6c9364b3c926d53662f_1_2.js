function(domNode){
		if(!domNode || !domNode._dvWidget || !domClass.contains(domNode,"mblView")){
			return;
		}
		var parentNode = domNode.parentNode;
		var widget = domNode._dvWidget;
		var context = widget.getContext();
		var viewsToUpdate = [];
		var node = domNode;
		var pnode = parentNode;
		// See if this View or any ancestor View is not currently visible
		while (node.tagName != 'BODY'){
			if(node.style.display == "none" || node.getAttribute("selected") != "true"){
				viewsToUpdate.splice(0, 0, node);
			}else{
				for(var i=0;i<pnode.children.length;i++){
					n=pnode.children[i];
					if(domClass.contains(n,"mblView")){
						if(n!=node && (n.style.display != "none" || n.getAttribute("selected") == "true")){
							viewsToUpdate.splice(0, 0, node);
							break;
						}
					}
				}
			}
			node = pnode;
			pnode = node.parentNode;
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