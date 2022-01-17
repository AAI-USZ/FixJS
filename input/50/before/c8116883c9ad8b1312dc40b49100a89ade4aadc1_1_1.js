function selectDocuments() {
	var id = getURLParameter("AID");
	// alert("die id ist"+id);
	// reset selectedID (account could have been deleted in meantime)
	// selectedOffer = null;
	// alert("ohne alert funzt es ned =( ");
	connect("/hiwi/Applicant/js/selectDocuments", "id=" + id,
			handleselectDocumentsResponse);
	// alert("ohne alert funzt es ned =( 2");
}