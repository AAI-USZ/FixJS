function() {
    var trimmed = $.trim( $(this.el).find(".inner-left").html() );

    ok(isNode(this.el), "Contents is a DOM Node");
    equal(trimmed, "Right", "Correct render");

    start();
  }