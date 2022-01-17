function(view){
			// summary:
			//		do view layout.
			//
			// view: Object
			//		view instance needs to do layout.

			if(!view){
				console.warn("layout empaty view.");
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
				children = query("> [region]", view.domNode).map(function(node){
					var w = registry.getEnclosingWidget(node);
					if(w){
						return w;
					}

					return {
						domNode: node,
						region: dattr.get(node, "region")
					};
				});
				if(view.selectedChild){
					children = array.filter(children, function(c){
						if((c.region == "center") && view.selectedChild && (view.selectedChild.domNode !== c.domNode)){
							dstyle.set(c.domNode, "zIndex", 25);
							dstyle.set(c.domNode, 'display', 'none');
							return false;
						}
						else if(c.region != "center"){
							dstyle.set(c.domNode, "display", "");
							dstyle.set(c.domNode, "zIndex", 100);
						}
						return c.domNode && c.region;
					}, view);
				}
				else{
					array.forEach(children, function(c){
						// fix layout container dispaly issue.
						// only need to undisplay view
						if(c && (c instanceof dojox.app.View) && c.domNode && c.region == "center"){
							dstyle.set(c.domNode, "zIndex", 25);
							dstyle.set(c.domNode, 'display', 'none');
						}
					});
				}
			}
			// We don't need to layout children if this._contentBox is null for the operation will do nothing.
			if(view._contentBox){
				layoutUtils.layoutChildren(view.domNode, view._contentBox, children);
			}
		}