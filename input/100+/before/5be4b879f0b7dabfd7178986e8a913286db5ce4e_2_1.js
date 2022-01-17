function() {
			var options;
			
			ist.registerHelper('testBlock', function(subcontext, subtemplate) {
				options = subtemplate.options;
				return subtemplate.document.createDocumentFragment();
			});
			ist.registerHelper('otherBlock', function(subcontext, subtemplate) {
				return subtemplate.document.createDocumentFragment();
			});
			fragment = ist(textParameters).render({ context: undefined });
			
			expect( typeof options ).toBe( 'object' );
			expect( options.first ).toBe( 'value' );
			expect( options.second ).toBe( 'va lu=e' );
		}