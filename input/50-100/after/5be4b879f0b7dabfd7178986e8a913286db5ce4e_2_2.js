function() {
			var arg,
				context = { context: { value: 'context' } };
				
				
			ist.registerHelper('testBlock', function(subcontext) {
				arg = subcontext;
				return document.createDocumentFragment();
			});
			ist(textBlockhelper).render(context);
			
			expect( arg.value ).toBe( context.context );
		}