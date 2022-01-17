function() {
			expect( elementNodes[0].nodeType ).toBe( document.ELEMENT_NODE );
			expect( elementNodes[0].ownerDocument ).toBe( document );
		}