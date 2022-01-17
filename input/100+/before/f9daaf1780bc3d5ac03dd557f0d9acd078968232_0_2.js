function gui_state(state){
  gui_blur();
  if(current_document != false){
    var source_id = get_current_source_id();
    if(state == "playing"){
      $("#player_" + current_document).find(".play").css("display", "none");
      $("#player_" + current_document).find(".pause").css("display", "inline");
      $("#player_" + current_document).find(".stop").css("display", "inline");
      $("#track_" + source_id).get(0).className = "playing_track";
    }
    else if(state == "paused"){
      $("#player_" + current_document).find(".play").get(0).style.display = "inline";
      $("#player_" + current_document).find(".pause").get(0).style.display = "none";
      $("#player_" + current_document).find(".stop").get(0).style.display = "inline";
      $("#track_" + source_id).get(0).className = "playing_track";
    }
    else if(state == "stoped"){
      $("#player_" + current_document).find(".play").get(0).style.display = "inline";
      $("#player_" + current_document).find(".pause").get(0).style.display = "none";
      $("#player_" + current_document).find(".stop").get(0).style.display = "none";
      $("#track_" + source_id).get(0).className = "track";
      $("#track_" + source_id + " .player_progress .position:not(#track_" + source_id + " .track .player_progress .position)").css("width", "0%");
    }
  }
}