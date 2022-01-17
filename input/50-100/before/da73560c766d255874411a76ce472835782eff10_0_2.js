function countGames(rssItems) {
    if (rssItems.length == 1 && rssItems.item(0).childNodes[1].firstChild.nodeValue == 'Empty lists') {
	chrome.browserAction.setBadgeText({'text': ''});
    } else {
	chrome.browserAction.setBadgeText({'text': rssItems.length.toString()});
    }
}