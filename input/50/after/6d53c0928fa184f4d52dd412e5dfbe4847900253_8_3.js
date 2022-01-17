function(selector, msg) {
      equal($(selector).length, 0, msg || ("element '" + selector + "' does not exist"));
    }