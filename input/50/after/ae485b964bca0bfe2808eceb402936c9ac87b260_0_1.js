function offersLoaded(result) {
	if (!result.error)
		populateOffers($(result.xmlDocument));
	else
		itemsRequestError();
}