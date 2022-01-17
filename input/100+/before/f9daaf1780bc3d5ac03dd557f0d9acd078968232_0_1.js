function player_listener_update(){
  if(
       (current_document != false)
    && (source_id = get_current_source_id())
    && (current_audio = $("#audio_" + current_document).get(0))
    && ($("#track_" + source_id + " .player_progress").size())
  ){
    $("#track_" + source_id + " .player_progress .position:not(#track_" + source_id + " .track .player_progress .position)").css(
      "width",
      Math.round((100 * current_audio.currentTime) / current_audio.duration) + "%"
    );
  }
}