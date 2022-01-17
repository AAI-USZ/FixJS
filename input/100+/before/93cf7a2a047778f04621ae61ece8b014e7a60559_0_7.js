function(config) {
            config = config || {};
            // something like http://<graphitehost[:port]>.  empty implicitly means current protocol/host/port
            var url_host = (typeof config.url_host === 'undefined') ? '' : config.url_host 
            // a prefix to apply to all paths to denote location of graphite web application.
            var url_path_prefix = (typeof config.url_path_prefix === 'undefined') ? '' : config.url_path_prefix

        return this.each(function() {
            var graph = $(this);
            var plot = null;
            var graph_lines = {};
            var metric_yaxis = {};
            var xaxisranges = {};
            var yaxisranges = {};
            var legends = null;
            var updateLegendTimeout = null;
            var latestPosition = null;
            var autocompleteoptions = {
                        minChars: 0,
                        selectFirst: false,
                        matchCase: true //Metrics can be case sensitive
            };
            var markings = [];

            var parse_incoming = function(incoming_data) {
                var result = [];
                var start = incoming_data.start;
                var end = incoming_data.end;
                var step = incoming_data.step;

                for (i in incoming_data.data) {
                    result.push([(start+step*i)*1000, incoming_data.data[i]]);

                }
                return {
                    label: incoming_data.name,
                    data: result,
                    lines: {show: true, fill: false}
                };
            };


            var render = function () {
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

            function updateLegend() {
                updateLegendTimeout = null;

                var pos = latestPosition;

                var axes = plot.getAxes();
                if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
                        pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
                    var i, j, dataset = plot.getData();
                    for (i = 0; i < dataset.length; ++i) {
                        var series = dataset[i];
                        legends.eq(i).text(series.label);
                    }
                }

                var i, j, dataset = plot.getData();
                for (i = 0; i < dataset.length; ++i) {
                    var series = dataset[i];

                    // find the nearest points, x-wise
                    for (j = 0; j < series.data.length; ++j)
                        if (series.data[j][0] > pos.x)
                            break;

                    // now interpolate
                    var y, p1 = series.data[j - 1], p2 = series.data[j];
                    if (p1 == null)
                        y = p2[1];
                    else if (p2 == null)
                        y = p1[1];
                    else
                        y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

                    if ( y != null ) {
                        legends.eq(i).text(series.label + " = " + y.toFixed(2));
                    } else {
                        legends.eq(i).text(series.label);
                    }
                    legends.eq(i).css('width', legends.eq(i).width());
                }
            }

            $("#graph").bind("plothover",  function (event, pos, item) {
                latestPosition = pos;
                if (!updateLegendTimeout)
                    updateLegendTimeout = setTimeout(updateLegend, 50);
            });

            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css( {
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 5,
                    border: '1px solid #fdd',
                    padding: '2px',
                    'background-color': '#fee',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }

            var previousPoint = null;
            $("#graph").bind("plothover", function (event, pos, item) {
                if (item) {
                    if ( !arrays_equal(previousPoint, item.datapoint)) {
                        previousPoint = item.datapoint;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY,
                                    item.series.label + " = " + y);
                    }
                } else {
                    calc_distance = function(mark, event) {
                        mark_where = plot.pointOffset({ x: mark.xaxis.from, y: 0});
                        d = plot.offset().left + mark_where.left - event.pageX - plot.getPlotOffset().left;
                        return d*d;
                    }
                    distance = undefined;
                    winner = null;
                    for (marki in markings) {
                        mark = markings[marki];
                        dist = calc_distance(mark, pos);
                        if (distance == undefined || distance > dist) {
                            distance = dist;
                            winner = mark;
                        }
                    }
                    if (distance < 20) {
                        if (!arrays_equal(previousPoint,[winner])) {
                            previousPoint = [winner]
                            $("#tooltip").remove();
                            showTooltip(pos.pageX-20, pos.pageY-20, winner.text);
                        }
                    } else {
                        if (previousPoint != null) {
                            previousPoint = null;
                            $("#tooltip").remove();
                        }

                    }
                }
            });

            $("#overview").bind("plotselected", function (event, ranges) {
                xaxisranges = { min: ranges.xaxis.from, max: ranges.xaxis.to };
                yaxisranges = { min: ranges.yaxis.from, max: ranges.yaxis.to };
                render()
            });

            $("#graph").bind("plotselected", function (event, ranges) {
                xaxisranges = { min: ranges.xaxis.from, max: ranges.xaxis.to };
                yaxisranges = { min: ranges.yaxis.from, max: ranges.yaxis.to };
                render()
            });

            var clear_zoom = function () {
                xaxisranges = {};
                yaxisranges = {};
                render();
            }

            var recalculate_all = function () {
                graph.find('.metricrow').each(function () {
                    var metric = $(this);
                    update_metric_row(metric);
                });
                get_events(graph.find("#eventdesc"), "#eventcount")
                render();
            }

            var build_when = function () {
                var when = new Array();
                var from  = graph.find("#from").text();
                if (from) {
                    when.push('from=' + from);
                }
                var until = graph.find("#until").text();
                if (until) {
                    when.push('until=' + until);
                }
                return when
            }

            var build_url_graph = function() {
                var url = url_host + url_path_prefix + '/graphlot/?';
                params = build_when();
                for (series in graph_lines) {
                    if (metric_yaxis[series] == "two") {
                        params.push('y2target=' + series);
                    } else {
                        params.push('target=' + series);
                    }
                }
                events = graph.find("#eventdesc").val();
                if (events != "") {
                    params.push('events=' + events);
                }

                return url + params.join("&");
            }
            var build_url_rawdata = function (series) {
                var url = url_host + url_path_prefix + '/graphlot/rawdata?';
                params = build_when();
                params.push('target=' + series);
                return url + params.join("&");
            }

            var build_url_events = function (tags) {
                var url = url_host + url_path_prefix + '/events/get_data?';
                params = build_when();
                if (tags != "*") {
                    params.push('tags=' + tags);
                }
                return url + params.join("&");
            }

            var update_metric_row = function(metric_row) {
                var metric = $(metric_row);
                var metric_name = metric.find(".metricname").text();
                metric.find(".metricname").addClass("ajaxworking");
                metric_yaxis[metric_name] = metric.find(".yaxis").text();

                $.ajax({
                    url: build_url_rawdata(metric_name),
                    success: function(req_data) {
                        metric.find(".metricname").removeClass("ajaxerror");
                        metric.find(".metricname").removeClass("ajaxworking");
                        graph_lines[metric_name] = [];
                        target = graph_lines[metric_name];
                        for (i in req_data) {
                            target.push(parse_incoming(req_data[i]));
                        }
                        render();
                    },
                    error: function(req, status, err) {
                        metric.find(".metricname").removeClass("ajaxworking");
                        metric.find(".metricname").addClass("ajaxerror");
                        render();
                    }
                });


            }

            var get_events = function(events_text, event_count) {
                if (events_text.val() == "") {
                    events_text.removeClass("ajaxworking");
                    events_text.removeClass("ajaxerror");
                    markings = [];
                    render();
                } else {
                    events_text.addClass("ajaxworking");
                    $.ajax({
                        url: build_url_events(events_text.val()),
                        success: function(req_data) {
                            events_text.removeClass("ajaxerror");
                            events_text.removeClass("ajaxworking");
                            markings = [];
                            $(event_count).text(req_data.length);
                            for (i in req_data) {
                                row = req_data[i];
                                markings.push({
                                    color: '#000',
                                    lineWidth: 1,
                                    xaxis: { from: row.when*1000, to: row.when*1000 },
                                    text:'<a href="'+SLASH+'events/'+row.id+'/">'+row.what+'<a>'
                                });
                            }
                            render();
                        },
                        error: function(req, status, err) {
                            events_text.removeClass("ajaxworking");
                            events_text.addClass("ajaxerror");
                            render();
                        }
                    });
                }

            }


            // configure the date boxes
            graph.find('#from').editable_in_place(
                function(editable, value) {
                    $(editable).text(value);
                    recalculate_all();
                }
            );


            graph.find('#until').editable_in_place(
                function(editable, value) {
                    $(editable).text(value);
                    recalculate_all();
                }
            );

            graph.find('#update').bind('click',
                function() {
                    recalculate_all();
                }
            );

            graph.find('#clearzoom').bind('click',
                clear_zoom
            );

            // configure metricrows
            var setup_row = function (metric) {
                var metric_name = metric.find('.metricname').text();

                metric.find('.metricname').editable_in_place(
                    function(editable, value) {
                        delete graph_lines[$(editable).text()];
                        $(editable).text(value);
                        update_metric_row(metric);
                    }
                );
                metric.find('.killrow').bind('click', function() {
                    delete graph_lines[metric.find('.metricname').text()];
                    metric.remove();
                    render();
                });

                metric.find('.yaxis').bind('click', function() {
                    if ($(this).text() == "one") {
                        $(this).text("two");
                    } else {
                        $(this).text("one");
                    }
                    metric_yaxis[metric_name] = metric.find(".yaxis").text();
                    render();
                });
            }

            graph.find('.metricrow').each(function() {
                setup_row($(this));
            });

            graph.find('.metricrow').each(function() {
                var row = $(this);

            });
            // configure new metric input
            graph.find('#newmetric').each(function () {
                var edit = $(this);
                edit.autocomplete('findmetric', autocompleteoptions);
                edit.keydown(function(e) {
                    if(e.which===13) { // on enter
                        // add row
                        edit.blur();
                        if (graph_lines[edit.val()] == null) {
                        var new_row = $('<tr class="metricrow"><td><a href=#><span class="metricName">'+edit.val()+'</span></a></td><td><a href=#><span class="yaxis">one</span></a></td><td class="killrow"><img src="../content/img/delete.gif"></td></tr>');
                            setup_row(new_row);
                            graph.find('#newmetricrow').before(new_row);
                            update_metric_row(new_row);
                            // clear input
                        }
                        edit.val('');
                    }
                });
            });

            // configure new metric input
            graph.find('#eventdesc').each(function () {
                var edit = $(this);
                edit.keydown(function(e) {
                    if(e.which===13) { // on enter
                        // add row
                        edit.blur();
                        get_events(edit, "#eventcount");
                    }
                });
            });


            // get data
            recalculate_all();
        });
    }