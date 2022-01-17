function(url) {
            if (!Sitesearch.selected.length || -1 != Sitesearch.selected.indexOf(url.id)) {
                var mid = chrome.contextMenus.create({'title': url.name, 'contexts':['selection'], 'onclick': Sitesearch.search});
                Sitesearch.urlMap[mid] = url.url;
                selected.push(url);
            }
        }