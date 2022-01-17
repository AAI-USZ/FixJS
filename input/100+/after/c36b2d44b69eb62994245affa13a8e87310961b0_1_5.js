function() {
      var controls, counter, fieldIndex, gIndex, group, _i, _len, _ref4, _ref5, _ref6,
        _this = this;
      controls = '<div id="groupControl" class="vis_controls">';
      controls += '<table class="vis_control_table"><tr><td class="vis_control_table_title">Groups:</tr></td>';
      controls += '<tr><td><div class="vis_control_table_div">';
      controls += '<select class="group_selector">';
      _ref4 = data.textFields;
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        fieldIndex = _ref4[_i];
        controls += "<option value=\"" + (Number(fieldIndex)) + "\">" + data.fields[fieldIndex].fieldName + "</option>";
      }
      controls += "</select></div></td></tr>";
      counter = 0;
      _ref5 = data.groups;
      for (gIndex in _ref5) {
        group = _ref5[gIndex];
        controls += '<tr><td>';
        controls += "<div class=\"vis_control_table_div\" style=\"color:" + globals.colors[counter] + ";\">";
        controls += "<input class=\"group_input\" type=\"checkbox\" value=\"" + gIndex + "\" " + ((_ref6 = Number(gIndex), __indexOf.call(globals.groupSelection, _ref6) >= 0) ? "checked" : "") + "></input>&nbsp";
        controls += "" + group + "&nbsp";
        controls += "</div></td></tr>";
        counter += 1;
      }
      controls += '</table></div>';
      ($('#controldiv')).html(($('#controldiv')).html() + controls);
      ($('.group_selector')).change(function(e) {
        var element, _ref7;
        element = e.target || e.srcElement;
        data.setGroupIndex(Number(element.value));
        if ((_ref7 = globals.groupSelection) == null) {
          globals.groupSelection = (function() {
            var _results;
            _results = [];
            for (keys in data.groups) {
              _results.push(Number(keys));
            }
            return _results;
          })();
        }
        return _this.start();
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