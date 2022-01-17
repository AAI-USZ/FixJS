function(data) {
            // remove the loading animation
            $("#loading").remove();

            if(data.nightlyCrashes) {
                graph = $.plot("#nightly_crash_trends_graph", data.nightlyCrashes, options);
                //emty the ul before appending the new dates
                $("#dates").empty();
                for(i = numberOfDates - 1; i >= 0; i--) {
                    $("#dates").append("<li>" + dates[i] + " " + selectedVersion + "</li>");
                }
            } else {
                $("#nightly_crash_trends_graph").empty().append("No data found for selected criteria");
            }
        }