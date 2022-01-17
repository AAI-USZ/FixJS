function(characterConfig, phrases) {
    document.getElementById("LEFT_COLUMN").style.display = "block";
    document.getElementById("RIGHT_COLUMN").style.display = "block";
    document.getElementById("RIGHT_COLUMN").style.overflowX = "auto";
    document.getElementById("RIGHT_COLUMN").style.height= "465px";
    document.getElementById("PHRASES").style.width = "445px";
    document.getElementById("PHRASES_MESSAGE").style.width = "445px";
    document.getElementById("PORTRAIT").style.backgroundImage = "url('" + characterConfig.PORTRAIT_SRC + "')";
    document.getElementById("VCR").style.display = "block";
    document.getElementById("VCR").style.position = "absolute";
    document.getElementById("VCR").style.bottom = "10px";
    document.getElementById("VCR").style.right = "10px";
    document.getElementById("VCR").style.width = "400px";
    $("#PLAY_BUTTON").click(AwesomeSharing.playSounds);
    $("#SHARE_BUTTON").click(function(){
      window.location.href="./index.htm";
    });
    phraseContainer = document.getElementById("PHRASES_MESSAGE");

    for (var i=0; i < phrases.length; i++)
    {
      var word = document.createElement("span");
      word.className = "PHRASE_SPAN";
      var cleanPhrase = phrases[i].replace(/_/g, "");
      if (i===0)
      {
        word.innerHTML = '"' + cleanPhrase + " ";
      }
      else if (i+1 === phrases.length)
      {
        word.innerHTML = cleanPhrase + '."';
      }
      else
      {
        word.innerHTML = cleanPhrase + " ";
      }
      phraseContainer.appendChild(word);
      phraseReferences.push(word);
    }

    return AwesomeShareUI;
  }