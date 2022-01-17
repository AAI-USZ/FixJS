function(req, status, err) {
                        metric.find(".metricname").removeClass("ajaxworking");
                        metric.find(".metricname").addClass("ajaxerror");
                        render();
                    }