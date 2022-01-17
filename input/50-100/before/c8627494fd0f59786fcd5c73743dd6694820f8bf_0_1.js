function(url) {
            if (!Sitesearch.selected.length || -1 != Sitesearch.selected.indexOf(url.id)) {
                chrome.contextMenus.create({'title': url.name, 'contexts':['selection'], 'onclick': Sitesearch.search});
                selected.push(url);
                item_count++;
            }
        }