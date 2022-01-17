function loadSounds(config) {
    // Pre-Load All UI Sounds
    if (config.UI !== undefined)
    {
      sounds.UI = {};
      var uiSounds = config.UI.SOUNDS;
      for (var i=0; i < uiSounds.length; i++)
      {
        var sound = uiSounds[i];
        sounds.UI[sound.id] = soundManager.createSound(
          buildSoundOptions(sound)
        );
      }
      currentMusic = sounds["UI"]["UI_TITLE_MUSIC"];
    }

    // Pre-Load All Character Phrases
    for (var  characterName in config.CHARACTERS)
    {
      var characterPhrases = config.CHARACTERS[characterName].PHRASES;
      sounds[characterName] = {};
      for (var i=0; i < characterPhrases.length; i++)
      {
        var phrase = characterPhrases[i];
        if (initializedBySharing === true)
        {
          sounds[characterName][phrase.TXT] = soundManager.createSound({
            id: characterName + "_" + phrase.TXT,
            url: phrase.SRC,
            autoLoad: true,
            volume: 100,
            onload: AwesomeSharing.checkLoadStatus
          });
        }
        else
        {
          sounds[characterName][phrase.TXT] = soundManager.createSound({
            id: characterName + "_" + phrase.TXT,
            url: phrase.SRC,
            autoLoad: true,
            volume: 100,
            onload: AwesomeLoading.somethingLoaded
          });
        }
      }
    }

    // Helper Function to Build SoundManager2 Options for Sounds
    function buildSoundOptions(opts) {
      var soundOpts = {};
      for (var opt in opts)
      {
        soundOpts[opt] = opts[opt];
      }
      soundOpts.onload = AwesomeLoading.somethingLoaded;
      soundOpts.autoLoad = true;
      return soundOpts;
    }
  }