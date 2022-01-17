function(selector, className, msg) {
      ok($(selector).hasClass(className),
          selector + " has className " + className + " - " + msg);
    }