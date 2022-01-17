function() {
        return $.each(['normal', 'focus', 'blur'], function(index, klass) {
          return it('must add #{ klass } to the target element', function() {
            var $div, $input;
            $div = $('<div><input type="text" /></div>');
            $input = $('input', $div);
            $.InField.render(klass, $input);
            return expect($div).toHaveClass(klass);
          });
        });
      }