function(visible) {
			if (visible) {
				var overlayVisibility = 1.0;
				var advancedHelpOffset = 0;
				var overlayDisplay = 'block';
			} else {
				var overlayVisibility = 0.0;
				var advancedHelpOffset = 200;
				var overlayDisplay = 'none';
			}
			
			$(overlayDiv).css({ display : 'block' }).animate({ opacity : overlayVisibility }, function() {
				$(overlayDiv).css({ display : overlayDisplay });
			});
			$(advancedHelpDiv).animate({ top : advancedHelpOffset });
		}