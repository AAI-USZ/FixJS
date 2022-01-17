function () {
                graph.find('.metricrow').each(function () {
                    var metric = $(this);
                    update_metric_row(metric);
                });
                get_events(graph.find("#eventdesc"), "#eventcount")
                render();
            }