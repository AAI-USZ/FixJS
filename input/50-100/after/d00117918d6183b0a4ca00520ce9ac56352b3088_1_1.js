function(data) {
            // remove the loading animation
            $(".loading").remove();

            socorro.ui.setUserMsg("legend", data);
        }