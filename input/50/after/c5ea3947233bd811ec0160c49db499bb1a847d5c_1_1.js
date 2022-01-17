function() {
	expect(2);
	strictEqual( jQuery( ).offset(), undefined, "offset() returns undefined for empty set (#11962)" );
	strictEqual( jQuery( ).position(), undefined, "position() returns undefined for empty set (#11962)" );
}