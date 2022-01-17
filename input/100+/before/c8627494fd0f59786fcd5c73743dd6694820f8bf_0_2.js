function() {
        var item_count = 0;
        var selected = [];
        Sitesearch.cycle(function(url) {
            if (!Sitesearch.selected.length || -1 != Sitesearch.selected.indexOf(url.id)) {
                chrome.contextMenus.create({'title': url.name, 'contexts':['selection'], 'onclick': Sitesearch.search});
                selected.push(url);
                item_count++;
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
            item_count += 2;
        }
        Sitesearch.menu_item_count = item_count;
        Sitesearch.menu_items_created_count += item_count;
    }