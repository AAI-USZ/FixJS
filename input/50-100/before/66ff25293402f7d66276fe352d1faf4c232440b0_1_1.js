function(c){
						// fix layout container dispaly issue.
						// only need to undisplay view
						if(c && (c instanceof dojox.app.View) && c.domNode && c.region == "center"){
							dstyle.set(c.domNode, "zIndex", 25);
							dstyle.set(c.domNode, 'display', 'none');
						}
					}