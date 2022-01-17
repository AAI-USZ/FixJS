function() {
                    delete graph_lines[metric.find('.metricname').text()];
                    metric.remove();
                    render();
                }