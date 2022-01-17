function GotRequest(request, sender, sendResponse) {

	DLog("BackgroundScript: Got request category [" + request.Category + "]");



	// Supports following categories

	//		Data

	//		Action

	switch (request.Category) {

		case "Data": { GotDataRequest(request, sendResponse); break; }

		case "Action": { GotActionRequest(request); break; }

		default:

			console.error("BackgroundScript: Unknown category!", request);

			break;

	}

}