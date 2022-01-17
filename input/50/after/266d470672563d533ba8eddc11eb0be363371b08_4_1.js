function() {
			expect( fragment.nodeType ).toBe( document.DOCUMENT_FRAGMENT_NODE );
			expect( fragment.ownerDocument ).toBe( document );
		}