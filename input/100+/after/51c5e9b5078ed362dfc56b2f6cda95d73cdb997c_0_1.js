function(params){
			var sceneId = params.sceneId;
			var dj = this.context.getDojo();
			var n;
			if(!dj){
				return;
			}
			var domNode = dj.byId(sceneId);
			var sceneSelected = null;
			if(this.context.declaredClass == 'davinci.ve.Context'){
				if(domNode){
					var widget = domNode._dvWidget;
					if(widget){
						var helper = widget.getHelper();
						if(helper && helper._updateVisibility){
							helper._updateVisibility(domNode);
							sceneSelected = sceneId;
						}
					}
				}
				var dj = this.context.select(widget);
			}else if(this.context.declaredClass == 'davinci.review.editor.Context'){
				if(domNode){
					var _dijit = dj.dijit;
					var node = domNode;
					var pnode = node.parentNode;
					var viewsToUpdate = [];
					// See if this View or any ancestor View is not currently visible
					while (node.tagName != 'BODY'){
						if(node.style.display == "none" || node.getAttribute("selected") != "true"){
							viewsToUpdate.splice(0, 0, node);
						}else{
							for(var i=0;i<pnode.children.length;i++){
								n=pnode.children[i];
								if(dj.hasClass(n,"mblView")){
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
					for(var v=0;v<viewsToUpdate.length;v++){
						var viewNode = viewsToUpdate[v];
						if(viewNode && viewNode.id){
							var newView = _dijit.byId(viewNode.id);
							if(newView){
								if(newView.declaredClass == 'dojox.mobile.SwapView'){
									// For SwapView, we have to slide one-by-one from current SwapView
									// to the newly select SwapView
									var showingView = newView.getShowingView();
									var showingViewIndex, newViewIndex;
									var nodes = showingView.domNode.parentNode.childNodes;
									for(var j = 0; j < nodes.length; j++){
										n = nodes[j];
										if(n.id == showingView.id){
											showingViewIndex = j;
										}
										if(n.id == newView.id){
											newViewIndex = j;
										}
									}
									if(this._swapViewChangeHandle){
										// Extra careful to make sure there is only one listener
										dj.unsubscribe(this._swapViewChangeHandle);
										this._swapViewChangeHandle = null;
									}
									if(typeof showingViewIndex == 'number' && typeof newViewIndex == 'number' && showingViewIndex !== newViewIndex){
										var dir = (newViewIndex > showingViewIndex) ? 1 : -1;
										var cv = showingView;	// cv = current view
										this._swapViewChangeHandle = dj.subscribe("/dojox/mobile/viewChanged",function(v){
											if(v && v.id && v.id != newView.id && v.id != cv.id){
												cv = v;
												cv.goTo(dir);
											}else{
												dj.unsubscribe(this._swapViewChangeHandle);
												this._swapViewChangeHandle = null;
												dojo.publish("/davinci/scene/selectionChanged", [this, newView.id]);
											}
										}.bind(this));
										cv.goTo(dir);
									}
								}else if(newView.show){
									// for View and ScrollableView, call show()
									newView.show();
								}
							}
						}
					}
					sceneSelected = (viewsToUpdate.length>0) ? sceneId : null;
				}
			}
			if(sceneSelected){
				dojo.publish("/davinci/scene/selectionChanged", [this, sceneSelected]);
			}
			return sceneSelected;
		}