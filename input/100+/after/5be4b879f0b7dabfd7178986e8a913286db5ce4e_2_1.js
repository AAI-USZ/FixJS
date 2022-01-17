function() {
			var options;
			
			ist.registerHelper('testBlock', function(subcontext, subtemplate, opt) {
				options = opt;
				return subtemplate.document.createDocumentFragment();
			});
			ist.registerHelper('otherBlock', function(subcontext, subtemplate, opt) {
				return subtemplate.document.createDocumentFragment();
			});
			fragment = ist(textParameters).render({ context: undefined });
			
			expect( typeof options ).toBe( 'object' );
			expect( options.first ).toBe( 'value' );
			expect( options.second ).toBe( 'va lu=e' );
		}