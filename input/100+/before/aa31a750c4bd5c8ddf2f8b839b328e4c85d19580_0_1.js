function(url, init_ver) {
        var dates = socorro.date.getAllDatesInRange(fromDate, toDate, "US_NUMERICAL"),
        selectedVersion = init_ver === undefined ? $("#version option:selected").val() : init_ver,
        numberOfDates = dates.length,
        ajax_path = url === undefined ? json_path : url,
        i = 0,
        options = {
            colors: ["#058DC7", "#ED561B", "#50B432", "#990099"],
            grid: {
                hoverable: true
            },
            legend: {
                noColumns: 9,
                container: "#graph_legend"
            },
            series: {
                stack: true,
                bars: {
                    show: true,
                    horizontal: true
                },
                points: {
                    show: true
                }
            },
            yaxis: {
                ticks: 0
            }
        };

        graphData = $.getJSON(ajax_path, function(data) {
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
        }).error(function(jqXHR, textStatus, errorThrown) {
            // remove the loading animation
            $("#loading").remove();
            $("#nightly_crash_trends_graph").empty().append(errorThrown);
        });
    }