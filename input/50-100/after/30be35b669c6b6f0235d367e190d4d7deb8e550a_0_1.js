function(element, settings, message) {
        if (element.data('valid') !== false) {
          var wrapper = element.closest('li');
          wrapper.addClass('error');
          var errorElement = $('<p class="' + settings.inline_error_class + '">' + message + '</p>');
          // wrapper.append(errorElement);
          element.after(errorElement);
        } else {
          element.parent().find('p.' + settings.inline_error_class).text(message);
        }
      }