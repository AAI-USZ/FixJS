function(){
			// summary:
			//		layout container

			// TODO: remove non HTML5 "region" in future versions
			children = query("> [data-app-region], > [region]", this.domNode).map(function(node){
				var w = registry.getEnclosingWidget(node);
				if(w){
					w.region = domAttr.get(node, "data-app-region") || domAttr.get(node, "region");
					return w;
				}

				return {
					domNode: node,
					region: domAttr.get(node, "data-app-region") || dom.Attr.get(node, "region")
				};
			});

			if(this._contentBox){
				layoutUtils.layoutChildren(this.domNode, this._contentBox, children);
			}
			array.forEach(this.getChildren(), function(child){
				if(!child._started && child.startup){
					child.startup();
				}
			});
		}