function(completeFunc) {
        var ajax = new AjaxClass('/listings/all_listing_locations/', 'listingsmsg', completeFunc);
        ajax.call();
    }