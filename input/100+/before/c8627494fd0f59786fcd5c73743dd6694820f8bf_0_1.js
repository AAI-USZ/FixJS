function(info) {
        // TODO try parent item and IDs instead of keeping track of created count
        // Chrome increments menuItemId values with every created menu item within a browser session
        var lid = Sitesearch.menu_item_count - Sitesearch.menu_items_created_count + info.menuItemId - 1;
        var site = null;
        if (Sitesearch.selected_urls) {
            site = Sitesearch.selected_urls[lid];
        }
        else {
            site = Sitesearch.urls[lid];
        }

        if (site) {
            chrome.tabs.create({'url': site.url.replace('#SEARCH#', info.selectionText)});
        }
        else {
            alert("menuItemId: " + info.menuItemId + "\nList ID: " + lid + "\nItem count: " + Sitesearch.menu_item_count + "\nCreated count: " + Sitesearch.menu_items_created_count + "\nSelected URLs" + Sitesearch.selected_urls);
        }
    }