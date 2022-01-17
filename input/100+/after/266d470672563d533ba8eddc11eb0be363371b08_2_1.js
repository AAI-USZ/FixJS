function() {
			var text, context = { context: { value: 'context' } };
			
			ist.registerHelper('testBlock', function(subcontext, subtemplate) {
				text = this.createTextNode('text value');
				return this.createDocumentFragment();
			});
			ist(textBlockhelper).render(context);
			
			expect( text.nodeType ).toBe( document.TEXT_NODE );
			expect( text.ownerDocument ).toBe( document );
			expect( text.textContent ).toBe( 'text value' );
		}