function (event, ui) {
            if (typeof ui.options.active == "number")
                $('#search-section-header').text("Hide Search Pane");
            else
                $('#search-section-header').text("Show Search Pane");
        }