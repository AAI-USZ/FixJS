function(visible) {
			if (visible) {
				var overlayVisibility = 1.0;
				var advancedHelpOffset = 0;
			} else {
				var overlayVisibility = 0.0;
				var advancedHelpOffset = 200;
			}
			
			$(overlayDiv).animate({ opacity : overlayVisibility });
			$(advancedHelpDiv).animate({ top : advancedHelpOffset });
		}