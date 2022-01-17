function (div, song) {

  var _setupControls = function (options) {
    var _audio = options.audio;

    options.play.click(function () {
      switch (_audio.getState()) {
        case 'play':
          _audio.setState('pause');
        break;
        case 'pause':
          _audio.setState('play');
        break;
      }
    });
    options.next.click(function () {
      _audio.fetch(_audio.getCurrent() + 1);
    });
    options.prev.click(function () {
      _audio.fetch(_audio.getCurrent() - 1);
    });   
  }
  ,   _setupProgress = function (options) {
    var audio = options.audio.get(0);
    options.audio.on('progress', function () {
      var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100) + 3, 10);
      options.loading.css({ width : loaded + '%'});
    });
    var manualSeek = false;
    var loaded = false;
    options.handle.css({top : '-50%' });
    options.audio.on('timeupdate', function () {
      var rem = parseInt(audio.duration - audio.currentTime, 10),
      pos = Math.floor((audio.currentTime / audio.duration) * 100),
      mins = Math.floor(rem/60, 10),
      secs = rem - mins * 60;

      options.timeLeft.text('-' + mins + ':' + (secs > 9 ? secs : '0' + secs));
      if (!manualSeek) { options.handle.css({left: pos + '%'}); }
      if (!loaded) {
        loaded = true;
      }
    });
  };



  var $next = $(div + ' button.playback-next')
  ,   $prev = $(div + ' button.playback-prev')
  ,   $play = $(div + ' button.playback-play')
  ,   $trackInfo = $(div + ' p.track-info')
  ,   $songProgress = $trackInfo.find('.song-progress')
  ,   $loading = $songProgress.find('.loading')
  ,   $timeLeft = $trackInfo.find('.timeleft')
  ,   $slider = $songProgress.find('.ui-slider')
  ,   $handle = $slider.find('.ui-slider-handle')
  ,   $title = $(div + ' h1.ui-title')
  ,   $buttonText = $play.parent().find('.ui-btn-text')
  ,   $audio = $(div + ' audio');

  var _audioModel = new Audio($audio);
  $audio.on('change:src', function (ev, filename) {
    var filenameArr = filename.split('/')
    ,   songName = filenameArr[filenameArr.length - 1];
    $title.text(songName);
  });
  $audio.on('change:state', function (ev, state) {
    switch (state) {
      case 'play':
        $buttonText.text("||");
      break;
      case 'pause':
        $buttonText.text("Play");
      break;
    }
  });

  // Hide the number of the slider
  $songProgress.find('input[type="number"]').hide();
  console.log(song);

  $loading = $slider.find('div.loading');
  if (!$loading.get(0)) {
    $handle.before('<div class="ui-slider loading" style="width: 3%; float: left; top: 0; left: -3%; background-color: buttonface;"></div>');
    $loading = $slider.find('div.loading');
  }
  _audioModel.fetch(song);

  _setupProgress({
    audio : $audio,
    handle : $handle,
    timeLeft : $timeLeft,
    loading : $loading
  });
  _setupControls({
    audio : _audioModel,
    next : $next,
    prev : $prev,
    play : $play
  });
}