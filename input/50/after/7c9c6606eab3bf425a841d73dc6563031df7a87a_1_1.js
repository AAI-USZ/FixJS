function() {
      testHelpers.setup();
      bid.Renderer.render("#page_head", "site/confirm", {});
      $(document.body).append($('<div id=redirectTimeout>'));
      $(".siteinfo,.password_entry").hide();
    }