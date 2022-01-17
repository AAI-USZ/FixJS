function(){
			if(this.arrowNode && !has("ie")){
				domStyle.set(this.arrowNode, "backgroundColor", domStyle.get(this.bodyNode, "backgroundColor"));
				var s = domStyle.get(this.bodyNode, "backgroundImage");
				var cls = domClass.contains(this.bodyNode, this.defaultColor) ? this.defaultColor : this.selColor;
				if(s === "none" || classHash[cls]){ return false; }
				var style = ".mblToolBarButtonArrow." + cls + "{background-image:" +
					s.replace(/\(top,/, "(top left,") // webkit new
					 .replace(/0% 0%, 0% 100%/, "0% 0%, 100% 100%") // webkit old
					 .replace(/50% 0%/, "0% 0%") + ";}"; // moz
				classHash[cls] = 1;
				domConstruct.create("style", {innerHTML:style}, win.doc.head, "first");
			}
			return true;
		}