function() {
        var params = $(this).serialize(),
        legnd = document.querySelectorAll("legend");

        clearMessages();

        //add loading animation
        socorro.ui.setLoader("body");

        $.getJSON("/admin/add_product?" + params, function(data) {
            // remove the loading animation
            $("#loading").remove();

            if(data.status === "success") {
                legnd[0].insertAdjacentHTML("afterend", "<div class='success'>" + data.message + "</div>");
            } else {
                legnd[0].insertAdjacentHTML("afterend", "<div class='error'>" + data.message + "</div>");
            }
        });
        return false;
    }