function() {
			var value;
			
			ist.registerHelper('otherBlock', function(subcontext, subtemplate) {
				value = subcontext.value;
				return this.createDocumentFragment();
			});
			
			ist(textString).render({});
			expect( value ).toBe( "direct string value" );
		}