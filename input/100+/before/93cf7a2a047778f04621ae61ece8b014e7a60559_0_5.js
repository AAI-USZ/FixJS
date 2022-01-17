function (metric) {
                var metric_name = metric.find('.metricname').text();

                metric.find('.metricname').editable_in_place(
                    function(editable, value) {
                        delete graph_lines[$(editable).text()];
                        $(editable).text(value);
                        update_metric_row(metric);
                    }
                );
                metric.find('.killrow').bind('click', function() {
                    delete graph_lines[metric.find('.metricname').text()];
                    metric.remove();
                    render();
                });

                metric.find('.yaxis').bind('click', function() {
                    if ($(this).text() == "one") {
                        $(this).text("two");
                    } else {
                        $(this).text("one");
                    }
                    metric_yaxis[metric_name] = metric.find(".yaxis").text();
                    render();
                });
            }