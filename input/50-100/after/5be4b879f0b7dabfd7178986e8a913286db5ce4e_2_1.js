function() {
			var hthis,
				context = { context: { value: 'context' } };
				
				
			ist.registerHelper('testBlock', function() {
				hthis = this;
				return document.createDocumentFragment();
			});
			ist(textBlockhelper).render(context);
			
			expect( hthis.value ).toBe( context );
		}