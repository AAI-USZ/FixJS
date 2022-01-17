function() {
      testHelpers.setup();
      bid.Renderer.render("#page_head", "site/confirm", {});
      $(".siteinfo,.password_entry").hide();
    }