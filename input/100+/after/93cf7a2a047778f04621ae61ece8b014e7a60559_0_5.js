function (metric) {
                var metric_name = metric.find('.g_metricname').text();

                metric.find('.g_metricname').editable_in_place(
                    function(editable, value) {
                        delete graph_lines[$(editable).text()];
                        $(editable).text(value);
                        update_metric_row(metric);
                    }
                );
                metric.find('.g_killrow').bind('click', function() {
                    delete graph_lines[metric.find('.g_metricname').text()];
                    metric.remove();
                    render();
                });

                metric.find('.g_yaxis').bind('click', function() {
                    if ($(this).text() == "one") {
                        $(this).text("two");
                    } else {
                        $(this).text("one");
                    }
                    metric_yaxis[metric_name] = metric.find(".g_yaxis").text();
                    render();
                });
            }