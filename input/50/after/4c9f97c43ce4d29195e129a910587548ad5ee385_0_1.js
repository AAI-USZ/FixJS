function(){
      if(!this.mute) {
      	$.get('cgi-bin/sound/volume-more');
        soundWidget.setVolume(soundWidget.volume + 5);
      }
    }