function() {
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
    }