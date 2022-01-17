function(metric_row) {
                var metric = $(metric_row);
                var metric_name = metric.find(".g_metricname").text();
                metric.find(".g_metricname").addClass("ajaxworking");
                metric_yaxis[metric_name] = metric.find(".g_yaxis").text();

                $.ajax({
                    url: build_url_rawdata(metric_name),
                    success: function(req_data) {
                        metric.find(".g_metricname").removeClass("ajaxerror");
                        metric.find(".g_metricname").removeClass("ajaxworking");
                        graph_lines[metric_name] = [];
                        target = graph_lines[metric_name];
                        for (i in req_data) {
                            target.push(parse_incoming(req_data[i]));
                        }
                        render();
                    },
                    error: function(req, status, err) {
                        metric.find(".g_metricname").removeClass("ajaxworking");
                        metric.find(".g_metricname").addClass("ajaxerror");
                        render();
                    }
                });


            }