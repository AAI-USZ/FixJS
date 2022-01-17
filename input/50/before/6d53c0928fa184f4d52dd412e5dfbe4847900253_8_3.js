function(selector, msg) {
      ok($(selector).length, msg || ("element '" + selector + "' exists"));
    }