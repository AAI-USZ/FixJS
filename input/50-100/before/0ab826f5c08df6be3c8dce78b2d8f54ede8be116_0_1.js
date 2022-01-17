function showMultipleDetailsPanel(itemTypeString) {
	// hide single message view
	$('#single-'+itemTypeString).hide();

	// show multi message view
	var multipleDetails = $("#multiple-"+itemTypeString+'s');
	multipleDetails.show();
	fsmsButton.findAndApply("input[type='submit']", multipleDetails);
	if (itemTypeString == "contact")
		selectmenuTools.refresh("#multi-group-dropdown");
	else
		selectmenuTools.refresh("#move-actions");
}