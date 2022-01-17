function(event) {
	offersListComp = $('#' + offersListName);
	$.ajax({
		url: 'allOffers.xml',
		dataType: 'xml',
		success: populateOffers
	});
}