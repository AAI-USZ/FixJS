function(window, webview) {
		
		// web controls iPhone
		if ( !feri.isAndroid() ) {
		
			var bb2 = Titanium.UI.createButtonBar({
				labels:['Nazaj', 'Osveži', 'Naprej'],
				backgroundColor:feri.ui.toolbarColor
			});
			var flexSpace = Titanium.UI.createButton({
				systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
			});
			
			window.setToolbar([flexSpace,bb2,flexSpace]);
			
			bb2.addEventListener('click',function(ce)
			{
				if (ce.index == 0)
				{
					webview.goBack();
				}
				else if (ce.index == 1)
				{
					webview.reload();
				}
				else
				{
					webview.goForward();
				}
			});
		
		} else {
			
			var activity = window.activity;
			activity.onCreateOptionsMenu = function(e) {
			    var menu = e.menu;
			    var menuItemBack = menu.add({ title: 'Nazaj' });
			    menuItemBack.addEventListener("click", function(e) {
			        webview.goBack();
			    });
			    var menuItemRefresh = menu.add({ title: 'Osveži' });
			    menuItemRefresh.addEventListener("click", function(e) {
			        webview.reload();
			    });
			    var menuItemForward = menu.add({ title: 'Naprej' });
			    menuItemForward.addEventListener("click", function(e) {
			        webview.goForward();
			    });
			};
		
		}
	}