function(config, initByShare) {
    initializedBySharing = initByShare;
    soundManager.setup({
      onready:function(){
        loadSounds(config);
      }
    });

    return AwesomeSounds;
  }