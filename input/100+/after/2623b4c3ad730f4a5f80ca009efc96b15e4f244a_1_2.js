function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_associating_input_and_non_parent_label(), $input = _ref[0], $label = _ref[1];
          $.InField.wrap($input, $label);
          expect($input.parent()).toBe("div." + $.in_field.klass);
          expect($input.parent().find('label:first')[0]).toEqual($label[0]);
          return expect($input.prev()).toBe('label');
        }