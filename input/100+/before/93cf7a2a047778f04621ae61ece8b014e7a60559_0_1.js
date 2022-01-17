function () {
                var lines = []
                for (i in graph_lines) {
                    for (j in graph_lines[i]) {
                        var newline = $.extend({}, graph_lines[i][j]);
                        if (metric_yaxis[i] == "two") {
                            newline['yaxis'] = 2;
                        }
                        lines.push(newline);
                    }
                }
                var xaxismode = { mode: "time" };
                var yaxismode = { };

                $.extend(xaxismode, xaxisranges);
                $.extend(yaxismode, yaxisranges);

                plot = $.plot($("#graph"),
                    lines,
                    {
                        xaxis: xaxismode,
                        yaxis: yaxismode,
                        grid: { hoverable: true, markings: markings },
                        selection: { mode: "xy" },
                        legend: { show: true, container: graph.find("#legend") },
                        crosshair: { mode: "x" },
                    }
                );


                for (i in lines) {
                    lines[i] = $.extend({}, lines[i]);
                    lines[i].label = null;
                }
                var overview = $.plot($("#overview"),
                    lines,
                    {
                        xaxis: { mode: "time" },
                        selection: { mode: "x" },
                    }
                );

                // legends magic
                legends = graph.find(".legendLabel");
                // update link
                graph.find("#graphurl").attr("href", build_url_graph());

            }