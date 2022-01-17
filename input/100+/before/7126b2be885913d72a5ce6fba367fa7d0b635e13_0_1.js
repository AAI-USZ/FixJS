function(request, sender, sendResponse) {

	switch (request.action) {

	case "refreshThumb":

		if (sender.tab) {

			var i = urls.indexOf(sender.tab.url);

			// check if sender tab url really added to fav pages

			if (i !== -1) {

				// save sender tab id we could use it inside callback

				var senderTabId = sender.tab.id;

				try {

					chrome.tabs.getSelected(null, function(currentTab) {

						// save current tab id in case user have changed tab and sender is inactive

						var TabIdReturnTo = currentTab.id;

						// switch to sender tab

						chrome.tabs.update(senderTabId, {

							selected: true,

							pinned: false

						}, function(tab) {

							// take screenshot

							createThumb(function(thumb) {

								// save it

								thumbs[urls[i]] = thumb;

								//save();

								refreshNewTabPages(i);

							});

							// switch back

							chrome.tabs.update(TabIdReturnTo, {

								selected: true,

								pinned: false

							});

						});

					});

				} catch (e) {

					console.log(e);

				}

				break;

			}

		}

		break;

	case "getSlots":

		if (sender.tab) {

			sendResponse({

				urls: urls,

				thumbs: thumbs

			});

		}

		break;

	case "subscribe":

		if (sender.tab) {

			subscribe(request.callback);

			sendResponse({});

		}

		break;

	default:

		sendResponse({}); // snub them.

	}

}