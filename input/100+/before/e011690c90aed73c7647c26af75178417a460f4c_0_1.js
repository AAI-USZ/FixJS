function(control_data, cities_data) {
    var cities, city, d4, d5, key, label_mapping, measure, measures, measures_controls, non_selectable_measures, num, options, pl_control, pl_lines, previousPoint, selected_measures, selected_river, value, yticks, _i, _len;
    measures = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = control_data.length; _i < _len; _i++) {
        num = control_data[_i];
        if (num.selectable && !num.selected && num.show) {
          _results.push([num.km_from, num.type_index, num.name, num.short_name, num.measure_type]);
        }
      }
      return _results;
    })();
    selected_measures = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = control_data.length; _i < _len; _i++) {
        num = control_data[_i];
        if (num.selected && num.show) {
          _results.push([num.km_from, num.type_index, num.name, num.short_name, num.measure_type]);
        }
      }
      return _results;
    })();
    non_selectable_measures = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = control_data.length; _i < _len; _i++) {
        num = control_data[_i];
        if (!num.selectable && num.show) {
          _results.push([num.km_from, num.type_index, num.name, num.short_name, num.measure_type]);
        }
      }
      return _results;
    })();
    cities = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cities_data.length; _i < _len; _i++) {
        city = cities_data[_i];
        _results.push([city[0], 8, city[1], city[1], "Stad"]);
      }
      return _results;
    })();
    label_mapping = {};
    for (_i = 0, _len = control_data.length; _i < _len; _i++) {
      measure = control_data[_i];
      label_mapping[measure.type_index] = measure.type_indicator;
    }
    yticks = (function() {
      var _results;
      _results = [];
      for (key in label_mapping) {
        value = label_mapping[key];
        _results.push([key, value]);
      }
      return _results;
    })();
    selected_river = $("#blockbox-river .chzn-select")[0].value;
    d4 = void 0;
    d5 = void 0;
    pl_lines = void 0;
    options = {
      xaxis: {
        min: window.min_graph_value,
        max: window.max_graph_value,
        reserveSpace: true,
        position: "bottom"
      },
      yaxis: {
        reserveSpace: true,
        labelWidth: 21,
        position: "left",
        tickDecimals: 0,
        ticks: yticks
      },
      grid: {
        minBorderMargin: 20,
        clickable: true,
        hoverable: true,
        borderWidth: 1
      },
      legend: {
        container: $("#measures_legend")
      }
    };
    measures_controls = [
      {
        label: "Steden",
        data: cities,
        points: {
          show: true,
          symbol: "circle",
          radius: 3,
          fill: 1,
          fillColor: BLACK
        },
        lines: {
          show: false
        },
        color: BLACK
      }, {
        label: "Maatregelen",
        data: measures,
        points: {
          show: true,
          symbol: "square",
          radius: 2,
          fill: 1,
          fillColor: BLUE
        },
        lines: {
          show: false
        },
        color: BLUE
      }, {
        label: "Geselecteerde maatregelen",
        data: selected_measures,
        points: {
          show: true,
          symbol: "diamond",
          radius: 4,
          fill: true
        },
        lines: {
          show: false
        },
        color: RED
      }, {
        label: "Niet-selecteerbare maatregelen",
        data: non_selectable_measures,
        points: {
          show: true,
          symbol: "cross",
          radius: 4
        },
        lines: {
          show: false
        },
        color: GRAY
      }
    ];
    pl_control = $.plot($("#measure_graph"), measures_controls, options);
    $("#measure_graph").bind("plotclick", function(event, pos, item) {
      var callback, measure_id, result_id;
      if (item) {
        if (item.series.label === "Steden") return;
        pl_control.unhighlight(item.series, item.datapoint);
        result_id = item.series.data[item.dataIndex][1];
        measure_id = item.series.data[item.dataIndex][3];
        if (!graphTimer) {
          callback = function() {
            toggleMeasure(measure_id);
            return graphTimer = '';
          };
          return graphTimer = setTimeout(callback, 200);
        }
      }
    });
    previousPoint = null;
    return $("#measure_graph").bind("plothover", function(event, pos, item) {
      var x, y;
      if (item) {
        if (item.pageX > ($(window).width() - 300)) item.pageX = item.pageX - 300;
        if (previousPoint !== item.dataIndex) {
          previousPoint = item.dataIndex;
          $("#tooltip").remove();
          x = item.datapoint[0].toFixed(2);
          y = item.datapoint[1].toFixed(2);
          return showTooltip(item.pageX, item.pageY, item.series.data[item.dataIndex][2], item.series.data[item.dataIndex][4]);
        }
      } else {
        $("#tooltip").remove();
        return previousPoint = null;
      }
    });
  }