function(url, init_ver) {
        var selectedVersion = init_ver === undefined ? $("#version option:selected").val() : init_ver,
        graphContainer = $("#nightly_crash_trends_graph"),
        datesContainer = $("#dates"),
        noResultsFoundMsg = "<p>No data found for selected criteria</p>",
        numberOfDates = 0,
        ajax_path = url === undefined ? json_path : url,
        i = 0,
        barPosition = 0,
        graphDataArray = [],
        dates = [],
        options = {
            colors: ["#058DC7", "#ED561B", "#50B432", "#990099"],
            grid: {
                hoverable: true
            },
            series: {
                stack: true,
                bars: {
                    show: true,
                    horizontal: true
                },
                points: {
                    show: true,
                    radius: 5
                }
            },
            yaxis: {
                ticks: 0
            }
        },
        graphData = {},
        buildGraphDataArray = function(data, report_date) {
            var report_count,
            currentDataArray = [];

            for(report_count in data) {
                currentDataArray.push([data[report_count], barPosition]);
            }
            barPosition += 1.5;
            return {"data" : currentDataArray};
        };

        graphDataJSON = $.getJSON(ajax_path, function(data) {
            var date;

            // remove the loading animation
            $("#loading").remove();

            if(data.crashtrends) {
                data = data.crashtrends;

                for(date in data) {
                    graphDataArray.push(buildGraphDataArray(data[date], date));
                    dates.push(date);
                }

                numberOfDates = dates.length;
                graphContainer.empty().css("height", 42 * numberOfDates + "px");

                graph = $.plot(graphContainer, graphDataArray, options);
                // empty the list before appending the new dates
                datesContainer.empty();
                for(i = numberOfDates - 1; i >= 0; i--) {
                    datesContainer.append("<li>" + dates[i] + " " + selectedVersion + "</li>");
                }
            } else {
                datesContainer.empty();
                graphContainer.remove();

                //The below code is needed because of a bug with Flot's tickLabel container
                graphContainer = document.createElement("div");
                graphContainer.setAttribute("id", "nightly_crash_trends_graph");
                graphContainer.insertAdjacentHTML("afterbegin", noResultsFoundMsg);
                $("#graph-figure").find(".crash_stats_body").append(graphContainer);
            }
        }).error(function(jqXHR, textStatus, errorThrown) {
            // remove the loading animation
            $("#loading").remove();
            $("#nightly_crash_trends_graph").empty().append(errorThrown);
        });
    }