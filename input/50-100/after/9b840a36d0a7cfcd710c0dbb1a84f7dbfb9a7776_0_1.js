function() {
    var htmlTag = $("html"),
        player = _V_("modal_video");
        playerHtml = $("#modal_video_player");

      playerHtml.removeClass("hidden");
      player.width(580);
      player.height(326);
      if (htmlTag.hasClass("ie9")) {
        console.log("ie9");
        _V_.options.techOrder = ["flash"];
      }

      player.play();
  }