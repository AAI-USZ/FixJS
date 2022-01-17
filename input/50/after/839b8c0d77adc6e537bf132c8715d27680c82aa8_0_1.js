function(result) {
			//console.log("tab zoom level:" + result);

			//set default zoom level when current tab never zoomed or can not zoom
			if(result === undefined) {
				result = localStorage.getItem("defaultZoomLevel");
			}

			//update extension badge
			chrome.browserAction.setBadgeText({
				text : result
			});
		}