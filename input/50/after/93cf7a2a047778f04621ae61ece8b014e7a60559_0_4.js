function() {
                    delete graph_lines[metric.find('.g_metricname').text()];
                    metric.remove();
                    render();
                }