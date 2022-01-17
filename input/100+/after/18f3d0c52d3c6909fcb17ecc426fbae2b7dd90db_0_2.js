function(shareData, configData) {
    playbackData = shareData;
    AwesomeSharing.awesomesounds = AwesomeSounds(buildSoundConfig(), true);
    AwesomeSharing.awesomeshareui = AwesomeShareUI(configData.CHARACTERS[shareData.C], shareData.P);

    function buildSoundConfig()
    {
      var uniquePhrases = {};
      for (var i=0; i < shareData.P.length; i++)
      {
        if (uniquePhrases[shareData.P[i]] === undefined)
        {
          uniquePhrases[shareData.P[i]] = audioSource(shareData.C, shareData.P[i]);
        }
      }
      var phrases = [];
      for (var phrase in uniquePhrases)
      {
        numSoundsToLoad++;
        phrases.push(uniquePhrases[phrase]);
      }

      var soundConf = { CHARACTERS: {} };
      soundConf.CHARACTERS[shareData.C] = configData.CHARACTERS[shareData.C];
      soundConf.CHARACTERS[shareData.C].PHRASES = phrases;

      return soundConf;

      function audioSource(character, phraseName)
      {
        var configPhrases = configData.CHARACTERS[character].PHRASES;
        for (var i=configPhrases.length-1; i > -1; i--)
        {
          if (configPhrases[i].TXT === phraseName)
          {
            return configPhrases[i];
          }
        }
      }
    }

    return AwesomeSharing;
  }