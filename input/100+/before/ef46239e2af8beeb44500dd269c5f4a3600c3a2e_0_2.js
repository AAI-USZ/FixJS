function(){
			if(this.arrowNode && !has("ie")){
				domStyle.set(this.arrowNode, "backgroundColor", domStyle.get(this.bodyNode, "backgroundColor"));
				var s = domStyle.get(this.bodyNode, "backgroundImage");
				if(s === "none"){ return false; }					
				domStyle.set(this.arrowNode, "backgroundImage",
							 s.replace(/\(top,/, "(top left,") // webkit new
							 .replace(/0% 0%, 0% 100%/, "0% 0%, 100% 100%") // webkit old
							 .replace(/50% 0%/, "0% 0%")); // moz
			}
			return true;
		}