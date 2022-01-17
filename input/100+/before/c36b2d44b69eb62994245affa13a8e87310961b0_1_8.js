function() {
  var _ref, _ref1, _ref2, _ref3, _ref4,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if ((_ref = window.globals) == null) {
    window.globals = {};
  }

  if ((_ref1 = globals.groupIndex) == null) {
    globals.groupIndex = 0;
  }

  if ((_ref2 = globals.groupSelection) == null) {
    globals.groupSelection = data.getUnique(globals.groupIndex);
  }

  if ((_ref3 = globals.fieldSelection) == null) {
    globals.fieldSelection = data.normalFields.slice(0, 1);
  }

  if ((_ref4 = globals.xAxis) == null) {
    globals.xAxis = data.numericFields[0];
  }

  window.BaseVis = (function() {
    /*
        Constructor
            Assigns target canvas name
    */

    function BaseVis(canvas) {
      this.canvas = canvas;
    }

    /*
        Builds Highcharts options object
            Builds up the options common to all vis types.
            Subsequent derrived classes should use $.extend to expand upon these agter calling super()
    */


    BaseVis.prototype.buildOptions = function() {
      var count, dummy, field,
        _this = this;
      this.chartOptions = {
        chart: {
          renderTo: this.canvas
        },
        colors: globals.getColors(),
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            events: {
              legendItemClick: function(event) {
                var index;
                index = data.normalFields[event.target.index];
                if (event.target.visible) {
                  arrayRemove(globals.fieldSelection, index);
                } else {
                  globals.fieldSelection.push(index);
                }
                return _this.update();
              }
            }
          }
        },
        series: [],
        symbols: globals.getSymbols(),
        title: {}
      };
      count = -1;
      return this.chartOptions.series = (function() {
        var _i, _len, _ref5, _ref6, _results;
        _ref5 = data.fields;
        _results = [];
        for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
          field = _ref5[_i];
          if (!((_ref6 = Number(field.typeID)) !== 37 && _ref6 !== 7)) {
            continue;
          }
          count += 1;
          _results.push(dummy = {
            data: [],
            color: '#000',
            marker: {
              symbol: this.chartOptions.symbols[count % this.chartOptions.symbols.length]
            },
            name: field.fieldName
          });
        }
        return _results;
      }).call(this);
    };

    /*
        Start sequence used by runtime
            This is called when the user switched to this vis.
            Should re-build options and the chart itself to ensure sync with global settings.
            This method should also be usable as a 'full update' in that it should destroy the current chart if it exists before generating a fresh one.
    */


    BaseVis.prototype.start = function() {
      var index, ser, _i, _len, _ref5;
      this.buildOptions();
      if (this.chart != null) {
        this.chart.destroy();
      }
      this.chart = new Highcharts.Chart(this.chartOptions);
      this.buildSeries();
      _ref5 = this.chart.series;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        ser = _ref5[_i];
        index = data.normalFields[ser.index];
        if (__indexOf.call(globals.fieldSelection, index) >= 0) {
          ser.show();
        } else {
          ser.hide();
        }
      }
      ($('#' + this.canvas)).show();
      return this.update();
    };

    /*
        Build the series structures and add them to the chart.
            This needs to be done by the specific chart based on its own needs.
    */


    BaseVis.prototype.buildSeries = function() {
      console.log(console.trace());
      return alert("BAD IMPLEMENTATION ALERT!\n\nCalled: 'BaseVis.buildSeries'\n\nSee logged stack trace in console.");
    };

    /*
        End sequence used by runtime
            This is called when the user switches away from this vis.
            Should destroy the chart, hide its canvas and remove controls.
    */


    BaseVis.prototype.end = function() {
      this.chart.destroy();
      this.clearControls();
      return ($('#' + this.canvas)).hide();
    };

    /*
        Update minor state
            Should update the hidden status based on both high-charts legend action and control checkboxes.
    */


    BaseVis.prototype.update = function() {
      this.clearControls();
      return this.drawControls();
    };

    /*
        Clear the controls
            Unbinds control handlers and clears the HTML elements.
    */


    BaseVis.prototype.clearControls = function() {
      ($('#controldiv')).find('*').unbind();
      return ($('#controldiv')).html('');
    };

    /*
        Draws controls
            Derived classes should write control HTML and bind handlers using the methods defined below.
    */


    BaseVis.prototype.drawControls = function() {
      console.log(console.trace());
      return alert("BAD IMPLEMENTATION ALERT!\n\nCalled: 'BaseVis.drawControls'\n\nSee logged stack trace in console.");
    };

    /*
        Draws group selection controls
            This includes a series of checkboxes and a selector for the grouping field.
            The checkbox text color should correspond to the graph color.
    */


    BaseVis.prototype.drawGroupControls = function() {
      var controls, counter, fieldIndex, group, _i, _j, _len, _len1, _ref5, _ref6,
        _this = this;
      controls = '<div id="groupControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">Groups:</tr></td>';
      controls += '<tr><td><div class="vis_control_table_div">';
      controls += '<select class="group_selector">';
      _ref5 = data.textFields;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        fieldIndex = _ref5[_i];
        controls += "<option value=\"" + fieldIndex + "\">" + data.fields[fieldIndex].fieldName + "</option>";
      }
      controls += "</select></div></td></tr>";
      counter = 0;
      _ref6 = data.getUnique(globals.groupIndex);
      for (_j = 0, _len1 = _ref6.length; _j < _len1; _j++) {
        group = _ref6[_j];
        controls += '<tr><td>';
        controls += "<div class=\"vis_control_table_div\" style=\"color:" + this.chartOptions.colors[counter] + ";\">";
        controls += "<input class=\"group_input\" type=\"checkbox\" value=\"" + group + "\" " + (__indexOf.call(globals.groupSelection, group) >= 0 ? "checked" : "") + "></input>&nbsp";
        controls += "" + group + "&nbsp";
        controls += "</div></td></tr>";
        counter += 1;
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      ($('.group_selector')).change(function(e) {
        var element;
        element = e.target || e.srcElement;
        globals.groupIndex = Number(element.value);
        globals.groupSelection = data.getUnique(globals.groupIndex);
        return _this.init();
      });
      return ($('.group_input')).click(function(e) {
        var selection;
        selection = [];
        ($('.group_input')).each(function() {
          if (this.checked) {
            return selection.push(this.value);
          }
        });
        globals.groupSelection = selection;
        return _this.update();
      });
    };

    /*
        Draws Field selection controls as checkboxes
            This includes a series of checkboxes with corresponding symbols from the graph.
    */


    BaseVis.prototype.drawFieldChkControls = function() {
      var controls, field, _ref5,
        _this = this;
      controls = '<div id="fieldControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">Fields:</tr></td>';
      for (field in data.fields) {
        if ((7 !== (_ref5 = Number(data.fields[field].typeID)) && _ref5 !== 37)) {
          controls += '<tr><td>';
          controls += '<div class="vis_control_table_div">';
          controls += "<input class=\"field_input\" type=\"checkbox\" value=\"" + field + "\" " + (__indexOf.call(globals.fieldSelection, field) >= 0 ? "checked" : "") + "></input>&nbsp";
          controls += "" + data.fields[field].fieldName + "&nbsp";
          controls += "</div></td></tr>";
        }
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      return ($('.field_input')).click(function(e) {
        var selection;
        selection = [];
        ($('.field_input')).each(function() {
          if (this.checked) {
            return selection.push(this.value);
          }
        });
        globals.fieldSelection = selection;
        return _this.update();
      });
    };

    /*
        Draws x axis selection controls
            This includes a series of radio buttons.
    */


    BaseVis.prototype.drawXAxisControls = function() {
      var controls, field,
        _this = this;
      controls = '<div id="xAxisControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">X Axis:</tr></td>';
      for (field in data.fields) {
        if ((Number(data.fields[field].typeID)) !== 37) {
          controls += '<tr><td>';
          controls += '<div class="vis_control_table_div">';
          controls += "<input class=\"xAxis_input\" type=\"radio\" name=\"xaxis\" value=\"" + field + "\" " + ((Number(field)) === globals.xAxis ? "checked" : "") + "></input>&nbsp";
          controls += "" + data.fields[field].fieldName + "&nbsp";
          controls += "</div></td></tr>";
        }
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      return ($('.xAxis_input')).click(function(e) {
        var selection;
        selection = null;
        ($('.xAxis_input')).each(function() {
          if (this.checked) {
            return selection = this.value;
          }
        });
        globals.xAxis = selection;
        return _this.update();
      });
    };

    BaseVis.prototype.groupFilter = function(dp) {
      var _ref5;
      return _ref5 = String(dp[globals.groupIndex]).toLowerCase(), __indexOf.call(globals.groupSelection, _ref5) >= 0;
    };

    return BaseVis;

  })();

}