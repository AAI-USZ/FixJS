function() {
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
      }