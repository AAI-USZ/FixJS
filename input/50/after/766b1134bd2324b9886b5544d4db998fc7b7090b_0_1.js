function() {
          $(form).find('.error').text(gettext('An error occurred.'));
          $(form).find('button').attr('disabled', false);
        }