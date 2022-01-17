function() {
    var view = this;
    var trimmed = $.trim(this.$(".inner-right div").html());

    ok(isNode(this.el), "Contents is a DOM Node");
    equal(trimmed, "Right", "Correct render");

    start();
  }