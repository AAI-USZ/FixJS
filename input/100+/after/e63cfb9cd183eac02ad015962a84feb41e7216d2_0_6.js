function(jqXHR, textStatus, errorThrown) {
            // remove the loading animation
            $("#loading").remove();
            // enable submit button again.
            $("input[type='submit']").removeAttr("disabled");
            $("#nightly_crash_trends_graph").empty().append(errorThrown);
        }