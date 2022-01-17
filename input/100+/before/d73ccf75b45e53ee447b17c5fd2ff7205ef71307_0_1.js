function(valueIndex, aValue) {
        path.splice(aValue.level, path.length - aValue.level);
        path[aValue.level] = aValue.term;
        aValue.meaning = path.join(' / ');
        var level = '', optionAttr = "value='" + valueIndex + "'", selected = false;
        if (aValue.id != '/0/') {
          for (var i = 0; i < aValue.level; i++) {
            level += '&nbsp;&nbsp;';
          }
          if (aValue.ascendant) {
            optionAttr = 'value="A" class="intfdcolor51" disabled="disabled"';
          }
          if ((selectedValues[anAxis.id] != null && aValue.id == selectedValues[anAxis.id].id) ||
            (aValue.id == anAxis.invariantValue)) {
            selected = true;
            selectedValues[anAxis.id] = aValue;
          }
          if (anAxis.invariantValue != null && anAxis.invariantValue != aValue.id) {
            optionAttr += ' disabled="disabled"';
          }
          var option =
            $('<option ' + optionAttr + '>').html(level + aValue.term).appendTo(axisValuesSelection);
          if (selected) option.attr('selected', 'selected');
        }
      }