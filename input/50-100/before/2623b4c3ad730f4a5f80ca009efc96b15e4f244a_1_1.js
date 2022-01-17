function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_not_linking_input_and_label(), $input = _ref[0], $label = _ref[1];
          return expect($.InField.find_and_validate_label($input, $('<table></table>'))).not.toBeTruthy();
        }