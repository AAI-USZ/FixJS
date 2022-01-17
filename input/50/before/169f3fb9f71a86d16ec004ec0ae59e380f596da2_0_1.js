function (event, ui) {
            if (ui.options.active == 0)
                $('#search-section-header').text("Show Search Pane");
            else
                $('#search-section-header').text("Hide Search Pane");
        }