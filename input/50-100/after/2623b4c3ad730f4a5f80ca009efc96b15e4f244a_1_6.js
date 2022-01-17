function() {
          var e;
          e = {
            keyCode: 31,
            target: '<input type="text" />'
          };
          expect($.InField.has_value(e)).not.toBeTruthy();
          e = {
            target: '<input type="text" />'
          };
          return expect($.InField.has_value(e)).not.toBeTruthy();
        }