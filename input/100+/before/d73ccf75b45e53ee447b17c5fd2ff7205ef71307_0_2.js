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
      
      // browse the values of the current axis
      $.each(anAxis.values, function(valueIndex, aValue) {
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
      });
      
      var defaultValue = '', disabled = '', selected = false;
      if (anAxis.mandatory) {
        defaultValue = settings.edition.mandatoryAxisDefaultValue;
        disabled = ' disabled="disabled" class="emphasis" ';
      }
      if (selectedValues[anAxis.id] == null) {
        selected = true;
      }
      var option =
        $('<option value="-"' + disabled + '>').html(defaultValue).prependTo(axisValuesSelection);
      if (selected) option.attr('selected', 'selected');
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