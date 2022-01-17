function(doAnimation) {
			//console.log('hide doAnimation', doAnimation);
			var t = this,
				doAnimation = typeof doAnimation == 'undefined' || doAnimation;
			
			if (!t.controlsAreVisible)
				return;
			
			if (doAnimation) {
				// fade out main controls
				t.controls.stop(true, true).fadeOut(200, function() {
					$(this)
						.css('visibility','hidden')
						.css('display','block');
						
					t.controlsAreVisible = false;
				});	
	
				// any additional controls people might add and want to hide
				t.container.find('.mejs-control').stop(true, true).fadeOut(200, function() {
					$(this)
						.css('visibility','hidden')
						.css('display','block');
				});	
			} else {
				
				// hide main controls
				t.controls
					.css('visibility','hidden')
					.css('display','block');		
				
				// hide others
				t.container.find('.mejs-control')
					.css('visibility','hidden')
					.css('display','block');
					
				t.controlsAreVisible = false;
			}
		}