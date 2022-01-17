function() {
    var player = _V_("modal_video");
        playerHtml = $("#modal_video_player");

      playerHtml.removeClass("hidden");
      player.width(580);
      player.height(326);
      player.play();
  }