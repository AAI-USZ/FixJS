function initializeSearchPane() {
    var icons = {
        header:"ui-icon-circle-arrow-e",
        headerSelected:"ui-icon-circle-arrow-s"
    };
    $('#search-section').accordion({
        collapsible:true,
        icons:icons,
        change:function (event, ui) {
            if (typeof ui.options.active == "number")
                $('#search-section-header').text("Hide Search Pane");
            else
                $('#search-section-header').text("Show Search Pane");
        }
    });
}