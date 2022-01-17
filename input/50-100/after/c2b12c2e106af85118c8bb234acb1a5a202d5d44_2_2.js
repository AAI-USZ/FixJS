function() {
			var arg = 'defined', arg2 = 'defined', options,
				context = { context: { value: 'context' } };
				
			ist.registerHelper('noParamBlock', function(subcontext) {
				arg = subcontext;
				return this.createDocumentFragment();
			});
			ist(textNone).render(context);
			
			expect( typeof arg ).toBe( 'undefined' );
		}