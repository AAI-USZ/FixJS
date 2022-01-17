function(valueIndex, aValue) {
        var level = '';
        path.splice(aValue.level, path.length - aValue.level);
        path[aValue.level] = aValue.term;
        aValue.meaning = path.join(' / ');
        if (aValue.id != '/0/') {
          for (var i = 0; i < aValue.level; i++) {
            level += '&nbsp;&nbsp;';
          }
          var option =
            $('<option>').attr('value', valueIndex).html(level + aValue.term).appendTo(axisValuesSelection);
          if (aValue.ascendant) {
            option.attr('value', 'A').attr('disabled', 'disabled').addClass("intfdcolor51");
          }
          if (anAxis.invariantValue != null && anAxis.invariantValue != aValue.id) {
            selectedValues[anAxis.id] = aValue;
            option.attr('disabled', 'disabled');
          }
          if ((selectedValues[anAxis.id] != null && aValue.id == selectedValues[anAxis.id].id)) {
            option.attr('selected', 'selected');
          }
        }
      }