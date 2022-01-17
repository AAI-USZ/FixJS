function() {
				setTimeout(function(){ // We have to wait for the entire layout pass to complete and the CSS rules to be applied.
					dimmingView.animate({
						opacity: 0.5,
						duration: 200
					}, function(){
						alertDialog.animate({
							opacity: 1,
							duration: 200
						});
					});	
				}, 0);
			}