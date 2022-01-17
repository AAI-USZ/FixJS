function() {
			var frag, context = { context: { value: 'context' } };
			
			ist.registerHelper('testBlock', function(subcontext, subtemplate) {
				frag = this.createDocumentFragment();
				return frag;
			});
			ist(textBlockhelper).render(context);
			
			expect( frag.nodeType ).toBe( document.DOCUMENT_FRAGMENT_NODE );
			expect( frag.ownerDocument ).toBe( document );
		}