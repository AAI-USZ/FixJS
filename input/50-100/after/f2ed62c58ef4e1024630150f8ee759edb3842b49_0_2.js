function(v, k) {
          var errField = jQuery("*[name='"+k+"'].field");

          if (errField.is(':checkbox, :radio')) {
            errField = errField.parent();
          }

          errField.addClass("error");
          errField.one('change focus', function() {
            errField.removeClass("error");
          });
        }