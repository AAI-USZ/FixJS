function initializeSearchPane() {
    var icons = {
        header:"ui-icon-circle-arrow-e",
        headerSelected:"ui-icon-circle-arrow-s"
    };
    $('#search-section').accordion({
        collapsible:true,
        icons:icons,
        change:function (event, ui) {
            if (ui.options.active == 0)
                $('#search-section-header').text("Show Search Pane");
            else
                $('#search-section-header').text("Hide Search Pane");
        }
    });
    $('#search-section').accordion("option", "active", true);

}