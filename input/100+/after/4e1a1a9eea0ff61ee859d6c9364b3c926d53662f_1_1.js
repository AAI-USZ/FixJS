function() {
			if(context.sceneManagers && context.sceneManagers.DojoMobileViews){
				context.sceneManagers.DojoMobileViews._viewAdded(parentNode._dvWidget, widget);
			}
			view.show(true /* don't run animations */);
		}