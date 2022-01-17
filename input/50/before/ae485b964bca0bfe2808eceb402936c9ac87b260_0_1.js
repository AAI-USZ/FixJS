function populateOffers(offersXML)
{
	$('#'+offersListName+' li').remove();
	
	$(offersXML).find("offer").each(function() {
		populateSingleOffer($(this));
	});
}