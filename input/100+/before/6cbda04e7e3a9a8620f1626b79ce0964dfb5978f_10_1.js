function() {
  "use strict";

  var bid = BrowserID,
      renderer = bid.Renderer,
      testHelpers = bid.TestHelpers;

  module("shared/renderer", {
    setup: function() {
      testHelpers.setup();
    },

    teardown: function() {
      testHelpers.teardown();
    }
  });

  test("render template loaded using XHR", function() {
    renderer.render("#formWrap .contents", "test_template_with_input");

    ok($("#templateInput").length, "template written when loaded using XHR");
  });

  test("render template from memory", function() {
    renderer.render("#formWrap .contents", "inMemoryTemplate");

    ok($("#templateInput").length, "template written when loaded from memory");
  });

  test("append template to element", function() {
    renderer.append("#formWrap", "inMemoryTemplate");

    ok($("#formWrap > #templateInput").length && $("#formWrap > .contents"), "template appended to element instead of overwriting it");

  });

}