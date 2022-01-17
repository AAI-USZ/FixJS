function() {
				dimmingView.animate({
					opacity: 0.5,
					duration: 200
				}, function(){
					alertDialog.animate({
						opacity: 1,
						duration: 200
					});
				});
			}