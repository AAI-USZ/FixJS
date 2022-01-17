function() {
			var arg,
				context = { context: { value: 'context' } };
				
				
			ist.registerHelper('testBlock', function(subcontext, subtemplate) {
				arg = subtemplate.document;
				return document.createDocumentFragment();
			});
			ist(textBlockhelper).render(context);
			
			expect( arg ).toBe( document );
		}