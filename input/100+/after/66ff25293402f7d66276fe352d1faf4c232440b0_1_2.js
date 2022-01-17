function(view){
			// summary:
			//		do view layout.
			//
			// view: Object
			//		view instance needs to do layout.

			if(!view){
				console.warn("layout empty view.");
				return;
			}

			var fullScreenScene, children, hasCenter;

			if(view.selectedChild && view.selectedChild.isFullScreen){
				console.warn("fullscreen sceen layout");
				/*
				 fullScreenScene=true;
				 children=[{domNode: this.selectedChild.domNode,region: "center"}];
				 query("> [region]",this.domNode).forEach(function(c){
				 if(this.selectedChild.domNode!==c.domNode){
				 dstyle(c.domNode,"display","none");
				 }
				 })
				 */
			}else{
				// TODO: remove non HTML5 "region" in future versions
				children = query("> [data-app-region], > [region]", view.domNode).map(function(node){
					var w = registry.getEnclosingWidget(node);
					if(w){
						w.region = domAttr.get(node, "data-app-region") || domAttr.get(node, "region");
						return w;
					}

					return {
						domNode: node,
						region: domAttr.get(node, "data-app-region") || domAttr.get(node, "region")
					};
				});
				if(view.selectedChild){
					children = array.filter(children, function(c){
						if((c.region == "center") && view.selectedChild && (view.selectedChild.domNode !== c.domNode)){
							domStyle.set(c.domNode, "zIndex", 25);
							domStyle.set(c.domNode, "display", "none");
							return false;
						}else if(c.region != "center"){
							domStyle.set(c.domNode, "display", "");
							domStyle.set(c.domNode, "zIndex", 100);
						}
						return c.domNode && c.region;
					}, view);
				}else{
					array.forEach(children, function(c){
						// fix layout container display issue.
						// only need to hide the view
						if(c && (c.widget instanceof dojox.app.View) && c.domNode && c.region == "center"){
							domStyle.set(c.domNode, "zIndex", 25);
							domStyle.set(c.domNode, "display", "none");
						}
					});
				}
			}
			// We don't need to layout children if this._contentBox is null for the operation will do nothing.
			if(view._contentBox){
				layoutUtils.layoutChildren(view.domNode, view._contentBox, children);
			}
		}