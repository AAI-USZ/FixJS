function() {
          var $input, $label, $result, _ref;
          _ref = set_fixtures_for_associating_input_and_non_parent_label(), $input = _ref[0], $label = _ref[1];
          $result = $.InField.find_label_for($input);
          expect($result[0]).toEqual($label[0]);
          expect($result instanceof jQuery).toBeTruthy();
          return expect($result).toBe('label');
        }