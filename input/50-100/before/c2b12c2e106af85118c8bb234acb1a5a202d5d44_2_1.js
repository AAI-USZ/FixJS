function() {
			var exception;
			
			try {
				ist(textParameters);
			} catch(e) {
				exception = e;
			}
			expect( typeof exception ).toBe( 'undefined' );
		}