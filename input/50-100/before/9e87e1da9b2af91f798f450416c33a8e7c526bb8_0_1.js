function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
	var selection = getSelectionHTML();
	//alert("selection: "+selection);
	sendResponse({ data: selection? selection : document.execCommand('paste'); });
    }
    else
      sendResponse({}); // snub them.
}