function track_ended(){
  gui_state("stoped");
  var current_audio = $("#audio_" + current_document).get(0);
  current_audio.pause();
  if(current_audio.currentTime) current_audio.currentTime = 0;
  if(autoplay_next) autoplay_next = play_next_source();
}