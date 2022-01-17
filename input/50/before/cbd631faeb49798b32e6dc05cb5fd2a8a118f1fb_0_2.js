function formURL(item)
	{
		var queryString = "body" + "=" + encodeURIComponent(item);
		noticeURL = chrome.extension.getURL('notification.html') + "?" + queryString;
		return noticeURL;
	}