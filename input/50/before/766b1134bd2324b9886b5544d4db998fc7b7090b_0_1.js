function() {
          $(form).find('.error').text(gettext('An error occured.'));
          $(form).find('button').attr('disabled', false);
        }