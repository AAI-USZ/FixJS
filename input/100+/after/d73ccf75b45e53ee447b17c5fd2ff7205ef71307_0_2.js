function(axisIndex, anAxis) {
      var currentAxisDiv = $('<div>').addClass('champs').appendTo($('<div>').addClass('field').
        append($('<label >', {
          'for': anAxis.id
        }).addClass('txtlibform').html(anAxis.name)).
        appendTo(axisSection));
      var mandatoryField = '';
      if (anAxis.mandatory) {
        mandatoryField = 'mandatoryField'
      }
      var axisValuesSelection = $('<select>', {
        'id': anAxis.id,  
        'name': anAxis.name
      }).addClass(mandatoryField).appendTo(currentAxisDiv).change( function() {
        var theValue = $(this).children(':selected').attr('value');
        if (theValue == '-') {
          selectedValues[anAxis.id] = null;
        } else {
          selectedValues[anAxis.id] = anAxis.values[theValue];
        }
      });
      var path = [];
      
      // browse the values of the current axis and for each of them print out an option HTML element
      // within the select (representing the current axis)
      if (anAxis.mandatory && anAxis.values[anAxis.values.length - 2].ascendant)
        selectedValues[anAxis.id] = anAxis.values[anAxis.values.length - 1];
      $.each(anAxis.values, function(valueIndex, aValue) {
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
      });
      
      var option = $('<option>').attr('value', '-').prependTo(axisValuesSelection);
      if (anAxis.mandatory) {
        option.attr('disabled', 'disabled').addClass('emphasis').html(settings.edition.mandatoryAxisDefaultValue);
      }
      if (selectedValues[anAxis.id] == null) {
        option.attr('selected', 'selected');
      }
      if (selectedValues[anAxis.id] != null) {
        $('<span>').html('<i>' + selectedValues[anAxis.id].synonyms.join(', ') + '</i>&nbsp;').appendTo(currentAxisDiv);
      }
      if (anAxis.mandatory) {
        hasMandatoryAxis = true;
        $('<img>', {
          src: settings.edition.mandatoryIcon,
          alt: settings.edition.mandatoryLegend, 
          width: '5px',
          height: '5px'
        }).appendTo(currentAxisDiv.append(' '));
      }
      if (anAxis.invariant) {
        hasInvariantAxis = true;
        $('<img>', {
          src: settings.edition.invariantIcon, 
          alt: settings.edition.invariantLegend,
          width: '10px',
          height: '10px'
        }).appendTo(currentAxisDiv);
      }
    }