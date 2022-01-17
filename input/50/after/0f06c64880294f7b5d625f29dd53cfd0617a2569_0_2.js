function() {
				var input = $(this);
				
				// Store date
				input.data('validated', input.val());
				
				// Contexualise
				contextualise(input);
				
				// Visualise calendar once
				if(input.is('.start')) {
					visualise(input);
				}
			}