function(c){
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
					}