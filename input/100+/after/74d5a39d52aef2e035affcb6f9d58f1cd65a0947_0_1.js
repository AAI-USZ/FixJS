function(element, settings, message) {
      var errorElement, wrapper;
      if (element.data('valid') !== false) {
        wrapper = element.closest(settings.wrapper_tag + ' .controls ');
        wrapper.parent().addClass(settings.wrapper_error_class);
        errorElement = $("<" + settings.error_tag + "/>", {
          "class": settings.error_class,
          text: message
        });
        return wrapper.append(errorElement);
      } else {
        return element.parent().find("" + settings.error_tag + "." + settings.error_class).text(message);
      }
    }