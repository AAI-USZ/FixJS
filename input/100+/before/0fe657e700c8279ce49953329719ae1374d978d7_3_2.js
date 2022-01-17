function() {
	expect( 7 );
	var xml = createDashboardXML(),
		iwt = jQuery( "infowindowtab", xml );

	equal( iwt.attr("normal"), "ab", "Check initial value" );
	iwt.removeAttr("Normal");
	equal( iwt.attr("normal"), "ab", "Should still be there" );
	iwt.removeAttr("normal");
	equal( iwt.attr("normal"), undefined, "Removed" );

	equal( iwt.attr("mixedCase"), "yes", "Check initial value" );
	equal( iwt.attr("mixedcase"), undefined, "toLowerCase not work good" );
	iwt.removeAttr("mixedcase");
	equal( iwt.attr("mixedCase"), "yes", "Should still be there" );
	iwt.removeAttr("mixedCase");
	equal( iwt.attr("mixedCase"), undefined, "Removed" );
}