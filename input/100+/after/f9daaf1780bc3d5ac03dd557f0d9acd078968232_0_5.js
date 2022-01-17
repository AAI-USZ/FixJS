function gui_state(state){
  gui_blur();
  if(current_document != false){
    var source_id = get_current_source_id();
    $("#track_" + source_id).removeClass("loading_player");
    if(state == "playing"){
      $("#player_" + current_document).find(".play").css("display", "none");
      $("#player_" + current_document).find(".pause").css("display", "inline");
      $("#player_" + current_document).find(".stop").css("display", "inline");
      $("#track_" + source_id).removeClass("track");
      $("#track_" + source_id).addClass("playing_track");
    }
    else if(state == "paused"){
      $("#player_" + current_document).find(".play").get(0).style.display = "inline";
      $("#player_" + current_document).find(".pause").get(0).style.display = "none";
      $("#player_" + current_document).find(".stop").get(0).style.display = "inline";
      $("#track_" + source_id).removeClass("track");
      $("#track_" + source_id).addClass("playing_track");
    }
    else if(state == "stoped"){
      $("#player_" + current_document).find(".play").get(0).style.display = "inline";
      $("#player_" + current_document).find(".pause").get(0).style.display = "none";
      $("#player_" + current_document).find(".stop").get(0).style.display = "none";
      $("#track_" + source_id).removeClass("playing_track");
      $("#track_" + source_id).addClass("track");
      $("#track_" + source_id + " .player_progress .position").not(
        "#track_" + source_id + " .pistes .player_progress .position").not(
        "#track_" + source_id + " .derivation .player_progress .position").css("width", "0%");
    }
    else if(state == "loading"){
      $("#track_" + source_id).addClass("loading_player");
    }
  }
}