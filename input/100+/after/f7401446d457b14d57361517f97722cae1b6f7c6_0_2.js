function(data) {
            var date;

            // remove the loading animation
            $("#loading").remove();

            if(data.crashtrends) {
                data = data.crashtrends;
                // enable submit button again.
                $("input[type='submit']").removeAttr("disabled");

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

                // enable submit button again.
                $("input[type='submit']").removeAttr("disabled");
            }
        }