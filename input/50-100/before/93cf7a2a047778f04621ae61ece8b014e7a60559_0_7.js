function() {
                    if ($(this).text() == "one") {
                        $(this).text("two");
                    } else {
                        $(this).text("one");
                    }
                    metric_yaxis[metric_name] = metric.find(".yaxis").text();
                    render();
                }