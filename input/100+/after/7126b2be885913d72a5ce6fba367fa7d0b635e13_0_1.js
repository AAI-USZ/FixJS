function(request, sender, sendResponse) {

	switch (request.action) {

	case "refreshThumb":

		if (sender.tab) {

			var i = urls.indexOf(sender.tab.url);

			// check if sender tab url really added to fav pages

			if (i !== -1) {

				try {

					createThumbOfTab(sender.tab, function(thumb) {

						// save it

						thumbs[urls[i]] = thumb;

						refreshNewTabPages(i);

						saveLocal();

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