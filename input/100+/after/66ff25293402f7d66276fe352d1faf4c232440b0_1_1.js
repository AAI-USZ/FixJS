function(c){
						if((c.region == "center") && view.selectedChild && (view.selectedChild.domNode !== c.domNode)){
							domStyle.set(c.domNode, "zIndex", 25);
							domStyle.set(c.domNode, "display", "none");
							return false;
						}else if(c.region != "center"){
							domStyle.set(c.domNode, "display", "");
							domStyle.set(c.domNode, "zIndex", 100);
						}
						return c.domNode && c.region;
					}