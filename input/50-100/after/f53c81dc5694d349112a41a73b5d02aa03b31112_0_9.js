function( data ) {
			
				// Show response message
				$response.html( data );

				// Scroll to bottom of the form to show respond message
				var bottomPosition = $form.offset().top + $form.outerHeight() - $(window).height();
				
				if( $(document).scrollTop() < bottomPosition )
					$('html, body').animate({ scrollTop : bottomPosition });
				
				// If form has been sent succesfully, clear it
				if( data.indexOf('success') !== -1 )
					$form.find('input:not(input[type="submit"]), textarea, select').val('').attr( 'checked', false );
				
			}