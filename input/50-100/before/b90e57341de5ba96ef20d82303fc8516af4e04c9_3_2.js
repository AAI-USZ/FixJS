function(el) {
    var trimmed = $.trim( $(el).find(".inner-left").html() );

    ok(isNode(el), "Contents is a DOM Node");
    equal(trimmed, "Right", "Correct render");

    start();
  }