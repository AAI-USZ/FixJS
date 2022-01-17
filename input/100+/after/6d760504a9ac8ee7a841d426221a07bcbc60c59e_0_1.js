function evalTime(){

  sanitiseInp();

  var tracksOut=[];
  var form=document.getElementById("timeInput");

  var hours=parseInt(form.hours.value);
  var mins=parseInt(form.mins.value);
  var secs=parseInt(form.secs.value);

  var targetSecs=secs+(60*mins)+(3600*hours);
  var targetMillis=targetSecs*1000;

  if(restrictedLib){
    trackLib=restrictedLib.tracks;
  }
  else{
    trackLib=lib.tracks;
  }

  var numTracks=trackLib.length;

  var libTotalMillis=0;
  for (var i in trackLib){
    libTotalMillis+=trackLib[i].duration;
  }
  var meanTrackLen=libTotalMillis/trackLib.length;

  //While the target time is far away (>5 mean track lengths), pick randomly
  var newTargetMillis=targetMillis;
  while(newTargetMillis>3*meanTrackLen){
    var rand=Math.floor(Math.random()*numTracks);
    var item=trackLib[rand];
    var itemLen=item.duration;
    //Don't go closer than 3 mean track lengths
    if((newTargetMillis-itemLen >2*meanTrackLen)){
      newTargetMillis-=itemLen;
      tracksOut.push(item);
    }
  }

  //Number of mean track lengths left in unallocated time
  var newMeanDist=Math.floor(newTargetMillis/meanTrackLen);

  //If n trackLengths remaining, pick n-1 tracks to add
  for(var i=0; i<newMeanDist-1; i++){
    var suitable=false;
    //Keep picking randomly until we get one +/- 5% of mean
    while(!suitable){
      var rand=Math.floor(Math.random()*numTracks);
      var item=trackLib[rand];
      var itemLen=item.duration;
      if(itemLen>(meanTrackLen-(meanTrackLen/20)) && 
          itemLen < meanTrackLen+(meanTrackLen/20)){
        tracksOut.push(item);
        suitable=true;
        newTargetMillis-=itemLen;
      }
    }
  }

  //Loop through entire library to find final track closest to target
  var found=false;
  var closeNum=newTargetMillis;
  var bestTrack;
  for (var i in trackLib){
    var thisTrack=trackLib[i];
    //Is it within a second?
    if(thisTrack.duration>(newTargetMillis+1000) && 
        thisTrack.duration<newTargetMillis+1000){
      found=true;
      closeNum=0;
      tracksOut.push(thisTrack);
      newTargetMillis-=thisTrack.duration;
    }
    //If not, it might still be the closest match
    //Some invalid tracks have -ve length, check >0
    else{
      if(Math.abs(newTargetMillis-thisTrack.duration) < closeNum &&
          thisTrack.duration > 0 &&
          tracksOut.indexOf(thisTrack)==-1){

        closeNum=Math.abs(newTargetMillis-thisTrack.duration);
        bestTrack=thisTrack;
      }
    }
  }

  if(!found){
    tracksOut.push(bestTrack);
  }

  accuracyHTML=getAccuracyHTML(closeNum);

  nameStr=makeName(hours,mins,secs);

  pl=getPlaylist(nameStr, tracksOut);

  if ($('#player')){
    $('#player').remove();
  }
  $('#wrapper').append(accuracyHTML);
  $('#player').append(pl.node);
}