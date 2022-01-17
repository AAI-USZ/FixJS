function(/*DomNode*/node){
			// tags:
			//		private
			setTimeout(function(){ // iPhone needs setTimeout
				domClass.remove(node, "mblListItemFloat");
				domStyle.set(node, {
					width: "",
					top: ""
				});
			}, 0);
		}