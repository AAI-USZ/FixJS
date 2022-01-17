function() {
	expect(1);
	strictEqual( jQuery( ).html(), undefined, ".html() returns undefined for empty sets (#11962)" );
}