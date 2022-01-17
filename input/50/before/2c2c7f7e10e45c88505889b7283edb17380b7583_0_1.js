function(completeFunc) {
        var ajax = new AjaxClass('/listings/all-listing-locations/', 'listingsmsg', completeFunc);
        ajax.call();
    }