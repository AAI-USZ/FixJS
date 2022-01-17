function(req_data) {
                        metric.find(".metricname").removeClass("ajaxerror");
                        metric.find(".metricname").removeClass("ajaxworking");
                        graph_lines[metric_name] = [];
                        target = graph_lines[metric_name];
                        for (i in req_data) {
                            target.push(parse_incoming(req_data[i]));
                        }
                        render();
                    }