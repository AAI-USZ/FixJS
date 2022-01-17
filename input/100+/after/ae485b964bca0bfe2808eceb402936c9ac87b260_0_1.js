function populateOffers(offersXML)
{
	$('#'+offersListName+' li').remove();
	offersXML.find("item").each(populateSingleOffer);
	offersListComp.listview('refresh');
}