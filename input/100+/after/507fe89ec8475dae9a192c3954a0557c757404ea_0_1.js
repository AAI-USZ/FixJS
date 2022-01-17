function() {
      if (this.selectedIndex < 1)
        return;

      if (this.options[this.selectedIndex].disabled) {
        // IE doesn't support disabled options
        alert(_("A filter already exists for that property"));
        this.selectedIndex = 0;
        return;
      }

      var propertyName = this.options[this.selectedIndex].value;
      var property = properties[propertyName];
      var table = $(this).closest("table.trac-clause")[0];
      var tbody = $("tr." + propertyName, table).closest("tbody").eq(0);
      var tr = $("<tr>").addClass(propertyName);

      var clauseNum = $(this).attr("name").split("_").pop();
      propertyName = clauseNum + "_" + propertyName;

      // Add the remove button
      tr.append($('<td>')
        .append($('<div class="inlinebuttons">')
          .append($('<input type="button" value="&ndash;">')
            .click(function() { removeRow(this, propertyName); }))));

      // Add the row header
      var th = $('<th scope="row">');
      if (!tbody.length) {
        th.append(createLabel(property.label)
                    .attr("id", "label_" + propertyName));
      } else {
        th.attr("colSpan", property.type == "time"? 1: 2)
          .append(createLabel(_("or")))
      }
      tr.append(th);

      var td = $("<td>");
      var focusElement = null;
      if (property.type == "radio" || property.type == "checkbox"
          || property.type == "time") {
        td.addClass("filter").attr("colSpan", 2);
        if (property.type == "radio") {
          for (var i = 0; i < property.options.length; i++) {
            var option = property.options[i];
            var control = createCheckbox(propertyName, option,
                                         propertyName + "_" + option);
            if (i == 0)
              focusElement = control;
            td.append(control).append(" ")
              .append(createLabel(option ? option : "none",
                                  propertyName + "_" + option)).append(" ");
          }
        } else if (property.type == "checkbox") {
          focusElement = createRadio(propertyName, "1", propertyName + "_on");
          td.append(focusElement)
            .append(" ").append(createLabel(_("yes"), propertyName + "_on"))
            .append(" ")
            .append(createRadio(propertyName, "0", propertyName + "_off"))
            .append(" ").append(createLabel(_("no"), propertyName + "_off"));
        } else if (property.type == "time") {
          focusElement = createText(propertyName, 14).datepicker();
          td.append(createLabel(_("between"))).append(" ")
            .append(focusElement).append(" ")
            .append(createLabel(_("and"))).append(" ")
            .append(createText(propertyName + "_end", 14).datepicker());
        }
        tr.append(td);
      } else {
        if (!tbody.length) {
          // Add the mode selector
          td.addClass("mode")
            .append(createSelect(propertyName + "_mode", modes[property.type]))
            .appendTo(tr);
        }

        // Add the selector or text input for the actual filter value
        td = $("<td>").addClass("filter");
        if (property.type == "select") {
          focusElement = createSelect(propertyName, property.options, true,
                                      property.optgroups);
        } else if ((property.type == "text") || (property.type == "id")
                   || (property.type == "textarea")) {
          focusElement = createText(propertyName, 42);
        }
        td.append(focusElement).appendTo(tr);
      }

      if (!tbody.length) {
        tbody = $("<tbody>");

        // Find the insertion point for the new row. We try to keep the filter
        // rows in the same order as the options in the 'Add filter' drop-down,
        // because that's the order they'll appear in when submitted
        var insertionPoint = $(this).closest("tbody");
        outer:
        for (var i = this.selectedIndex + 1; i < this.options.length; i++) {
          for (var j = 0; j < table.tBodies.length; j++) {
            if (table.tBodies[j].rows[0].className == this.options[i].value) {
              insertionPoint = $(table.tBodies[j]);
              break outer;
            }
          }
        }
        insertionPoint.before(tbody);
      }
      tbody.append(tr);

      if(focusElement)
          focusElement.focus();

      // Disable the add filter in the drop-down list
      if (property.type == "radio" || property.type == "checkbox"
          || property.type == "id")
        this.options[this.selectedIndex].disabled = true;

      this.selectedIndex = 0;

      // Enable the Or... button if it's been disabled
      $("#add_clause").attr("disabled", false);
    }