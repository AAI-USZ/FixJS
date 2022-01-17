function checkIfPlaying() {
  var tag = document.getElementsByClassName("still_listening")[0];
  if (tag != undefined ) {
    document.getElementsByClassName("still_listening")[0].click();
    console.log("clicked the link"); 
  }

  if (document.getElementsByClassName("playButton")[0].style['cssText'] == 'display: block; ') {
    document.getElementsByClassName("playButton")[0].click();
    console.log("pressed play");
  }
}