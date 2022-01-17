function(selector, msg) {
      equal($(selector).is(":checked"), true, msg || selector + " is checked");
    }