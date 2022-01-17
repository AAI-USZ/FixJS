function(e) {
        e.preventDefault();

        var helpRequestId = jQuery(e.currentTarget).data("id");

        if (helpRequestId !== undefined)
            location.href = "/help-requests/" + helpRequestId;
    }