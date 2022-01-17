function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
	var select = getSelectionHTML();
	sendResponse({ urlData: select });
    }
    else
	sendResponse({});
}