function(config) {
    soundManager.setup({
      onready:function(){
        loadSounds(config);
      }
    });

    return AwesomeSounds;
  }