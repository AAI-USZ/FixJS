function(html) {
					if (outer.checkErrors(html)) {
						piggydb.widget.imageViewer.close();
						outer.unblock();
					}
					else {
						if (jQuery.isFunction(outer.onSaved)) 
							outer.onSaved(html);
						else
							piggydb.widget.Fragment.onAjaxSaved(html, outer.fragment);
						
						outer.close();
					}
				}