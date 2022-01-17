function validateData(shareRequest, configData) {
    // Validate Character Name
    if (shareRequest.C === undefined || shareRequest.C === null)
    {
      return "The character name parameter, 'c={character_name}', is missing";
    }
    if (configData.CHARACTERS[shareRequest.C] === undefined)
    {
      var errorMessage = "The character name, '" + shareRequest.C + "', is not one of the valid characters:<br/>";
      for (var validCharacter in configData.CHARACTERS)
      {
        errorMessage += "<br/>" + validCharacter;
      }
      return errorMessage;
    }

    // Validate Each Phrase Contains Configuration Information
    if (shareRequest.P === undefined)
    {
      return "Missing phrases parameter, p={phrases_list}, where<br/>'phrases_list' is a comma delimited string of phrases";
    }
    else
    {
      var phrases = shareRequest.P;
      var configCharacterPhrases = configData.CHARACTERS[shareRequest.C].PHRASES;

      console.log(phrases, configCharacterPhrases);
      for (var i=phrases.length-1; i > -1; i--)
      {
        var phraseConfigAvailable = false;
        for (var k=configCharacterPhrases.length-1; k > -1; k--)
        {
          if (configCharacterPhrases[k].TXT === phrases[i])
          {
            phraseConfigAvailable = true;
            break;
          }
        }
        if (phraseConfigAvailable === false)
        {
          return "Invalid Phrase, '" + phrases[i] + "', Specified<br/><br/>No configuration data available for this phrase and character.";
        }
      }
    }

    if (shareRequest.T === undefined)
    {
      return "Missing timings parameter, t={timing_list}, where<br/>'timing_list' is a comma delimited string of times<br/>to wait between each phrase";
    }
    else
    {
      var timings = shareRequest.T;
      for (var i=timings.length-1; i > -1; i--)
      {
        if (isNaN(parseInt(timings[i])) === true)
        {
          return "Invalid Timing Value, '" + timings[i] + "', specified.<br/><br/>All timing values must be integer numbers.";
        }
      }
    }

    if (shareRequest.P.length !== shareRequest.T.length)
    {
      return "The number of phrases, " + shareRequest.P.length + ", does not match<br/>with the number of timings, " + shareRequest.T.length;
    }

    return true;
  }