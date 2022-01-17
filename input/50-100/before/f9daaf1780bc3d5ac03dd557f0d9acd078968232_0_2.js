function pause(){
  if(current_document != false){
    var audio_elt = $("#audio_" + current_document).get(0);
    audio_elt.pause();
    gui_state("paused");
  }
}