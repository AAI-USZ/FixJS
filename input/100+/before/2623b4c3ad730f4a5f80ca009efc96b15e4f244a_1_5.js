function($) {
    var set_fixtures_for_empty_input_and_label, set_fixtures_for_linking_input_and_non_parent_label, set_fixtures_for_linking_input_and_parent_label, set_fixtures_for_non_empty_input_and_label, set_fixtures_for_not_linking_input_and_label;
    set_fixtures_for_not_linking_input_and_label = function() {
      setFixtures('<label>Last Name</label><input type="text" name="first_name" />');
      return [$('input', $('#jasmine-fixtures')), $('label', $('#jasmine-fixtures'))];
    };
    set_fixtures_for_linking_input_and_parent_label = function() {
      setFixtures('<label>First Name <input type="text" name="first_name" /></label>');
      return [$('input', $('#jasmine-fixtures')), $('label', $('#jasmine-fixtures'))];
    };
    set_fixtures_for_linking_input_and_non_parent_label = set_fixtures_for_empty_input_and_label = function() {
      setFixtures('<label for="first_name">First Name</label><input id="first_name" type="text" />');
      return [$('input', $('#jasmine-fixtures')), $('label', $('#jasmine-fixtures'))];
    };
    set_fixtures_for_non_empty_input_and_label = function() {
      setFixtures('<label for="first_name">First Name</label><input id="first_name" type="text" value="Tian" />');
      return [$('input', $('#jasmine-fixtures')), $('label', $('#jasmine-fixtures'))];
    };
    return describe('InField', function() {
      describe('::present', function() {
        it('must return true if the object is presented as not empty jQuery', function() {
          return expect($.InField.present($('body'))).toBeTruthy();
        });
        return it('must return not true if the object is not presented', function() {
          expect($.InField.present(void 0)).not.toBeTruthy();
          expect($.InField.present({})).not.toBeTruthy();
          expect($.InField.present([])).not.toBeTruthy();
          expect($.InField.present([1])).not.toBeTruthy();
          return expect($.InField.present($('something'))).not.toBeTruthy();
        });
      });
      describe('::validate_input', function() {
        it('must return not true if the input element is not supported', function() {
          expect($.InField.validate_input($('<article />'))).not.toBeTruthy();
          return expect($.InField.validate_input($('<input type="unknown" />'))).not.toBeTruthy();
        });
        return it('must return true if the input element is supported', function() {
          return expect($.InField.validate_input($('<input type="text" />'))).toBeTruthy();
        });
      });
      describe('::find_and_validate_label', function() {
        it('must return not true if the label element associated with the input element is not found', function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_not_linking_input_and_label(), $input = _ref[0], $label = _ref[1];
          return expect($.InField.find_and_validate_label($input, $('<table></table>'))).not.toBeTruthy();
        });
        it('must return the label jQuery object if the label element is found outside wrapping the input element', function() {
          var $input, $label, $result, _ref;
          _ref = set_fixtures_for_linking_input_and_parent_label(), $input = _ref[0], $label = _ref[1];
          $result = $.InField.find_and_validate_label($input, $('<table></table>'));
          expect($result[0]).toEqual($label[0]);
          expect($result instanceof jQuery).toBeTruthy();
          return expect($result).toBe('label');
        });
        return it('must return the label jQuery object if the label element is found for the input element', function() {
          var $input, $label, $result, _ref;
          _ref = set_fixtures_for_linking_input_and_non_parent_label(), $input = _ref[0], $label = _ref[1];
          $result = $.InField.find_and_validate_label($input, $('<table></table>'));
          expect($result[0]).toEqual($label[0]);
          expect($result instanceof jQuery).toBeTruthy();
          return expect($result).toBe('label');
        });
      });
      describe('::find_label_for', function() {
        it('must return undefined when there is no label associated with the input element', function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_not_linking_input_and_label(), $input = _ref[0], $label = _ref[1];
          return expect($.InField.find_label_for($input)).toBeUndefined();
        });
        it('must return the label jQuery object when there is one in the parents of the input element', function() {
          var $input, $label, $result, _ref;
          _ref = set_fixtures_for_linking_input_and_parent_label(), $input = _ref[0], $label = _ref[1];
          $result = $.InField.find_label_for($input);
          expect($result[0]).toEqual($label[0]);
          expect($result instanceof jQuery).toBeTruthy();
          return expect($result).toBe('label');
        });
        return it('must return the label jQuery object when there is one associated with the input element', function() {
          var $input, $label, $result, _ref;
          _ref = set_fixtures_for_linking_input_and_non_parent_label(), $input = _ref[0], $label = _ref[1];
          $result = $.InField.find_label_for($input);
          expect($result[0]).toEqual($label[0]);
          expect($result instanceof jQuery).toBeTruthy();
          return expect($result).toBe('label');
        });
      });
      describe('::link', function() {
        it('must generate the id for the input element and the label element', function() {
          var $input, $label;
          $input = $('<input type="text" />');
          $label = $('<label>label_text</label>');
          $.InField.link($input, $label);
          expect($label.attr('for')).not.toBeUndefined();
          expect($label.attr('for')).toMatch(/^jquery_in_field_label_\d+$/i);
          return expect($label.attr('for')).toEqual($input.attr('id'));
        });
        return it('must set the id for the input element and the label element', function() {
          var $input, $label;
          $input = $('<input id="input1" type="text" />');
          $label = $('<label>label_text</label>');
          $.InField.link($input, $label);
          expect($label.attr('for')).not.toBeUndefined();
          expect($label.attr('for')).toEqual($input.attr('id'));
          return expect($label.attr('for')).toEqual('input1');
        });
      });
      describe('::wrap', function() {
        it('must wrap the label and input element in a div when the input is inside the label', function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_linking_input_and_parent_label(), $input = _ref[0], $label = _ref[1];
          $.InField.wrap($input, $label);
          expect($input.parent()).toBe("div." + $.in_field.klass);
          expect($input.parent().find('label:first')[0]).toEqual($label[0]);
          return expect($input.prev()).toBe('label');
        });
        return it('must wrap the label and input element in a div when the input is outside the label', function() {
          var $input, $label, _ref;
          _ref = set_fixtures_for_linking_input_and_non_parent_label(), $input = _ref[0], $label = _ref[1];
          $.InField.wrap($input, $label);
          expect($input.parent()).toBe("div." + $.in_field.klass);
          expect($input.parent().find('label:first')[0]).toEqual($label[0]);
          return expect($input.prev()).toBe('label');
        });
      });
      describe('::mark_as_toggled', function() {
        return it('must set the data-toggle for the input', function() {
          var $input;
          $input = $('<input type="text" />');
          $.InField.mark_as_toggled($input);
          return expect($input.attr('data-toggle')).toEqual($.in_field.klass);
        });
      });
      describe('::has_value', function() {
        it('must return true if input has value', function() {
          var e;
          e = {
            keyCode: 32,
            target: '<input type="text" value="something" />'
          };
          return expect($.InField.has_value(e)).toBeTruthy();
        });
        it('must return true if input has no value but user starts to type', function() {
          var e;
          e = {
            keyCode: 32,
            target: '<input type="text" />'
          };
          return expect($.InField.has_value(e)).toBeTruthy();
        });
        return it('must return not true if input has no value and user is not typing', function() {
          var $input, e;
          e = {
            keyCode: 31,
            target: '<input type="text" />'
          };
          $input = $('<input type="text" />');
          expect($.InField.has_value(e)).not.toBeTruthy();
          e = {
            target: '<input type="text" />'
          };
          return expect($.InField.has_value(e)).not.toBeTruthy();
        });
      });
      return describe('::render', function() {
        return it('must add focus to the target element', function() {
          return expect(1).toEqual(0);
        });
      });
    });
  }