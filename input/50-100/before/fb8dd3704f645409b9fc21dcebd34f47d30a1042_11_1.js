function() {
				optionsDialog.animate({
					bottom: -optionsDialog._measuredHeight,
					opacity: 1,
					duration: 0
				});
				dimmingView.animate({
					opacity: 0.5,
					duration: 150
				}, function(){
					optionsDialog.animate({
						bottom: 0,
						duration: 150
					});
				});
			}