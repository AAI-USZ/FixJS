function track_loadeddata(event){
  var audio_elt = event.target;
  audio_elt.removeEventListener("loadeddata", track_loadeddata, false);
  if(current_document != false){
    audio_elt.currentTime = audio_elt.position ? (audio_elt.position * audio_elt.duration) / 100 : 0;
  }
}