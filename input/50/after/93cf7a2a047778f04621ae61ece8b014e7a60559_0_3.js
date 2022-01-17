function(req, status, err) {
                        metric.find(".g_metricname").removeClass("ajaxworking");
                        metric.find(".g_metricname").addClass("ajaxerror");
                        render();
                    }