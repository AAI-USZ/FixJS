function(info, tab) {
        chrome.tabs.create({'url': Sitesearch.urlMap[info.menuItemId].replace('#SEARCH#', info.selectionText)});
    }