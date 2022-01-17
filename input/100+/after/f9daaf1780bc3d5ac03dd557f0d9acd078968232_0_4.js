function play(id_document){
  if(current_document == id_document){
    if($("#audio_" + current_document).get(0).paused){
      gui_state("playing");
      $("#audio_" + current_document).get(0).play();
    }
  }
  else{
    if(current_document != false){
      var audio_elt = $("#audio_" + current_document).get(0);
      audio_elt.pause();
      audio_elt.currentTime = 0;
      gui_state("stoped");
    }
    current_document = id_document;
    _play(0);
  }
}