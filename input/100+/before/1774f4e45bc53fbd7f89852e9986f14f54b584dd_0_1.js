function(event) {
		if (event.target.localName != "folderitem" && event.target.localName != "toolbarbutton")
			return;
		// disallow drag-over operation onto search folders and livemark folders
		if (event.target.hasAttribute("query") || event.target.hasAttribute("livemark"))
			return;
		// allow drag opeartions only for the following data: 
		// * normal bookmark (text/x-moz-place)
		// * browser tab (application/x-moz-tabbrowser-tab)
		// * hyper lin (text/x-moz-url)
		if (!event.dataTransfer.types.contains(PlacesUtils.TYPE_X_MOZ_PLACE) && 
		    !event.dataTransfer.types.contains(PlacesUtils.TYPE_X_MOZ_URL) && 
		    !event.dataTransfer.types.contains(TAB_DROP_TYPE))
			return;
		event.preventDefault();
		switch (event.type) {
			case "dragenter": 
				this._dragOverTime = Date.now();
				this._dragOverItem = event.target.getAttribute("itemId");
				event.target.setAttribute("open", "true");
				break;
			case "dragover": 
				if (Date.now() - this._dragOverTime > 1000) {
					// when dragging-over a folder for one second...
					this._dragOverTime = Date.now();
					if (!event.target.disabled)
						event.target.doCommand();
				}
				break;
			case "dragleave": 
				// this fixes the problem: current folder will be changed 
				// just after starting drag-over operation due to odd events sequence
				this._dragOverTime = null;
				this._dragOverItem = null;
				event.target.removeAttribute("open");
				break;
			case "drop": 
				this._dragOverTime = null;
				this._dragOverItem = null;
				event.target.removeAttribute("open");
				var itemId = event.target.getAttribute("itemId");
				if (!itemId)
					return;
				PlacesControllerDragHelper.currentDataTransfer = event.dataTransfer;
				PlacesControllerDragHelper.currentDropTarget = event.target;
				var ip = new InsertionPoint(itemId, -1, Ci.nsITreeView.DROP_ON, false);
				PlacesControllerDragHelper.onDrop(ip, event.dataTransfer);
				break;
			default: 
		}
	}