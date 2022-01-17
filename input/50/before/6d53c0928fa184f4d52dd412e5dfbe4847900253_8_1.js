function(selector, className, msg) {
      ok($(selector).hasClass(className),
          msg || (selector + " has className " + className));
    }