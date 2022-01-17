function() {
			if(context.sceneManagers && context.sceneManagers.DojoMobileViews){
				context.sceneManagers.DojoMobileViews._viewAdded(parentNode._dvWidget, widget);
			}
			// Since this may get called twice, check that we haven't already
			// created this interval.
			if (! widget._dvDisplayInterval) {
				widget._dvDisplayInterval = setInterval(function() {
					if(!node || !node.ownerDocument || !node.ownerDocument.defaultView){
						return;
					}
					var win = windowUtils.get(node.ownerDocument);
					if(!win || !win.dojox || !win.dojox.mobile){
						return;
					}
					if (win.dojox.mobile.currentView === view ||
							node.style.display === 'none') {
						node.style.display = 'block';
						clearInterval(widget._dvDisplayInterval);
						delete widget._dvDisplayInterval;
					}
				}, 100);
			}
		}