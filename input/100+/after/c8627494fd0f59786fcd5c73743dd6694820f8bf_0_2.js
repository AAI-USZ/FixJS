function() {
        var selected = [];
        Sitesearch.cycle(function(url) {
            if (!Sitesearch.selected.length || -1 != Sitesearch.selected.indexOf(url.id)) {
                var mid = chrome.contextMenus.create({'title': url.name, 'contexts':['selection'], 'onclick': Sitesearch.search});
                Sitesearch.urlMap[mid] = url.url;
                selected.push(url);
            }
        });
        // when no URL is selected show all
        if (!Sitesearch.selected.length) {
            Sitesearch.selected_urls = selected;
        }
        if (Sitesearch.selected.length > 1) {
            // create separated options page link and update counts
            chrome.contextMenus.create({'type': 'separator', 'contexts':['selection']});
            chrome.contextMenus.create({'title': 'Options', 'contexts':['selection'], 'onclick': function(info, tab){
                chrome.tabs.create({'url': 'options.html'});
            }});
        }
    }