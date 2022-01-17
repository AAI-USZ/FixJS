function GotActionRequest(request) {

	DLog("BackgroundScript: Got Action request [" + request.Name + "]");



	if (request.requestName == "IsFirstPlay") {

		chrome.tabs.create({ url: GetURL("Pages/Welcome.html") }, function () { });

	}

}