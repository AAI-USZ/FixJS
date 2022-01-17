function() {
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
    }