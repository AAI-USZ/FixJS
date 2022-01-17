function(selector, msg) {
      ok($(selector).is(":visible"), msg || selector + " should be visible");
    }