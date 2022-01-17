function() {
			expect( textNodes[0].nodeType ).toBe( document.TEXT_NODE );
			expect( textNodes[0].textContent ).toBe("text node");
			expect( textNodes[0].ownerDocument ).toBe( document );
		}