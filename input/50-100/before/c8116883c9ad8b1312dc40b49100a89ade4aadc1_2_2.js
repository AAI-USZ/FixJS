function documentsFromOffer() {
	var aid = getURLParameter("AID");
	connect("/hiwi/Clerk/js/documentsFromOffer", "aid=" + aid,
			handledocumentsFromOfferResponse);
	// alert("ohne alert funzt es ned =( ");
}