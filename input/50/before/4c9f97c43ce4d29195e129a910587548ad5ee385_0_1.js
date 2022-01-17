function(){
      $.get('cgi-bin/sound/volume-more');
      soundWidget.setVolume(soundWidget.volume + 5);
    }