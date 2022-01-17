function() {
        var params = $(this).serialize();

        clearMessages();

        //add loading animation
        socorro.ui.setLoader("body");

        $.getJSON("/admin/add_product?" + params, function(data) {
            // remove the loading animation
            $(".loading").remove();

            socorro.ui.setUserMsg("legend", data);
        });
        return false;
    }