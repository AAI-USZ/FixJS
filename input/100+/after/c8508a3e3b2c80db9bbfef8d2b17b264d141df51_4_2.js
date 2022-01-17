function() {

    // The amount of time we have to transition is 
    // The minimum of the remaining time in the video and the lead time
    //
    // By this point, we have already loaded the video with
    // enough time for a video commercial and then let that
    // play in hiding.  The video itself should have started too
    // so we should have some of it buffered already and then
    // can just seek back without a buffering issue.
    var 
      pivot = Math.min(PRELOAD, remainingTime(_playerPrev[_active])) * 1000,

      // raise the volume of the next one slightly before dropping
      // the volume of the current
      raiseNextVolume = pivot - 500,

      // drop the volume of the currently playing song
      dropPlayingVolume = pivot + 250,

      // Stop the old video 1 second after the
      // pivot transition
      stopOldVideo = pivot + 1000,

      // These will change somewhere in the 
      // mess so we store it locally.
      active = _player[_active],
      next = _player[_next];

    Player.safeLoad(next, uuid, Math.max(offset, 0));

    next.setPlaybackQuality("medium");
    next.setVolume(0);
    next.playVideo();

    log("video loaded");

    setTimeout(function(){
      $("#video-current").html("<b>Loading next song ...</b>" + [_song.artist, _song.title].join(' - '));

      log("raise next volume");
      next.seekTo(Math.max(offset, 0));
      // Crank up the volume to the computed normalization
      // level. 
      //
      // There's some issue with a fraction of a second
      // being respected before the seeking goes on, so you hear
      // a little click then the seekback happens ... I'm guessing
      // because the seekTo is some kind of asynchronous non-blocking
      // call and then the volume takes place immediately. 
      //
      // So to combat this we simply put a 100ms timeout around
      // the volume adjusting
      setTimeout(function(){
        next.setVolume(song.volume * _volume);
      }, 100);
    }, raiseNextVolume);

    setTimeout(function(){
      $("#video-current").html("<b>" + _song.artist + "</b>" +  _song.title);
      log("pivot");

      // Toggle the player pointers
      _active = (_active + 1) % 2;
      _next = (_active + 1) % 2;

      // When you toggle the visibility, there is still an annoying spinner.
      // So to avoid this we just "move" the players off screen that aren't
      // being used.
      /*
      Player.flashSwap({
        hide: active,
        show: next
      });
      */
      Player.show(next, 'slide');
      Player.hide(active, 'slide');
      Player.hide(_playerPrev[EXTRA]);

      next.index = index;
      _playerById[index] = _player[_active];

      _index = index;
      _playerPrev = _player;
    }, pivot);

    setTimeout(function(){ 
      log("drop playing volume");
      if(active) {
        Volume.fadeById(active);
      }
    }, dropPlayingVolume);

    setTimeout(function(){
      if(active) {
        log("stopping old video");
        active.stopVideo();
        if("index" in active) {
          delete _playerById[active.index];
        }
      }
    }, stopOldVideo);
  }