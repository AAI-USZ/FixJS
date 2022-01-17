function(){
			//set default region="center"
			if(!this.region){
				this.region = "center";
				domAttr.set(this.srcNodeRef, "data-app-region", "center");
			}
			this.inherited(arguments);

			//fix slide transition issue on tablet
			domStyle.set(this.domNode, "overflow-x", "hidden");
			domStyle.set(this.domNode, "overflow-y", "auto");

			// build scrollable container if scrollable=true
			if(this.scrollable && this.scrollable == "true"){
				this.inherited(arguments);
				this.domNode.style.position = "absolute";
				this.domNode.style.width = "100%";
				this.domNode.style.height = "100%";
			}
		}