function(jqXHR, textStatus, errorThrown) {
            // remove the loading animation
            $("#loading").remove();
            $("#nightly_crash_trends_graph").empty().append(errorThrown);
        }