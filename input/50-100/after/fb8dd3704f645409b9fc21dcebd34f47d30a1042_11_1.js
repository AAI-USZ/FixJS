function() {
				setTimeout(function(){ // We have to wait for the entire layout pass to complete and the CSS rules to be applied.
					optionsDialog.animate({
						bottom: -optionsDialog._measuredHeight,
						opacity: 1,
						duration: 0
					});
					dimmingView.animate({
						opacity: 0.5,
						duration: 200
					}, function(){
						optionsDialog.animate({
							bottom: 0,
							duration: 200
						});
					});
				}, 0);
			}