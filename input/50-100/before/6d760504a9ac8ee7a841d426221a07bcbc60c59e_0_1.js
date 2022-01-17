function appendAccuracyHTML(distance){
  var playerHTML= document.getElementById('player');
  if(distance==0){
    playerHTML+='<h2>Done! Perfect time match</h2>';
  }
  else{
    secs=distance/1000;
    timeStr=" second";
    if(secs>1){
      timeStr+="s"
    }
    playerHTML.innerHTML='<h2>Done, accurate to within '+secs+ timeStr+'!</h2>';
  }
}