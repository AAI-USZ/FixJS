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

                plot = $.plot($(id('graph', graph)),
                    lines,
                    {
                        xaxis: xaxismode,
                        yaxis: yaxismode,
                        grid: { hoverable: true, markings: markings },
                        selection: { mode: "xy" },
                        legend: { show: true, container: wrap.find(id('legend', graph)) },
                        crosshair: { mode: "x" },
                    }
                );


                for (i in lines) {
                    lines[i] = $.extend({}, lines[i]);
                    lines[i].label = null;
                }
                var overview = $.plot($(id('overview', graph)),
                    lines,
                    {
                        xaxis: { mode: "time" },
                        selection: { mode: "x" },
                    }
                );

                // legends magic
                legends = wrap.find(".legendLabel");
                // update link
                wrap.find(id('graphurl', graph)).attr("href", build_url_graph());

            }