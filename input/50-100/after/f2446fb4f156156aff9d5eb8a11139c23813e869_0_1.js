function(element, settings) {
      var errorElement, wrapper;
      wrapper = element.closest("" + settings.wrapper_tag + "." + settings.wrapper_error_class);
      wrapper.removeClass(settings.wrapper_error_class);
      errorElement = wrapper.find("" + settings.error_tag + "." + settings.error_class_selector);
      return errorElement.remove();
    }