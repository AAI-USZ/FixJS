function _play(position){
  if(current_document != false){
    var audio_elt = $("#audio_" + current_document).get(0);
    audio_elt.pause();
    audio_elt.currentTime = position ? (position * audio_elt.duration) / 100 : 0;
    audio_elt.play();
  }
}