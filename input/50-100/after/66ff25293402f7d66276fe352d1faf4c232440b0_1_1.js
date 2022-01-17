function(c){
						// fix layout container display issue.
						// only need to hide the view
						if(c && (c.widget instanceof dojox.app.View) && c.domNode && c.region == "center"){
							domStyle.set(c.domNode, "zIndex", 25);
							domStyle.set(c.domNode, "display", "none");
						}
					}