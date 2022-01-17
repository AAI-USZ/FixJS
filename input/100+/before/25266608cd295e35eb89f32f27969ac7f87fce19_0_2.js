function play(track)
  { if(current_track != track)
    { var save_autoplay_next = autoplay_next;
      stop();
      autoplay_next = save_autoplay_next;
      current_track = track;
      get_player().SetVariable("method:setUrl", tracks[track]);
    }
    has_started = false;
    get_player().SetVariable("method:play", "");
    get_player().SetVariable("enabled", "true");
    $("#track_" + track).find(".play").get(0).style.display = "none";
    $("#track_" + track).find(".play").get(0).blur();
    $("#track_" + track).find(".pause").get(0).style.display = "inline";
    $("#track_" + track).find(".stop").get(0).style.display = "inline";
    $("#track_" + track).get(0).className = "playing_track";
  }