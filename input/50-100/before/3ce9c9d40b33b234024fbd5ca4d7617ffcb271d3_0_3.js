function(html) {
					if (outer.checkErrors(html)) {
						piggydb.widget.imageViewer.close();
						outer.unblock();
					}
					else {
						piggydb.widget.Fragment.onAjaxSaved(html, outer.fragment);
						outer.close();
						if (jQuery.isFunction(outer.onRegistered)) 
							outer.onRegistered(html);
					}
				}