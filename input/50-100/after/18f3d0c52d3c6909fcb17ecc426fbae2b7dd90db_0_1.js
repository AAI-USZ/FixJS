function loadSharing(configData) {
    loadingMessages.style.display = "none";
    var shareData = getCharacterPhrasesAndTiming(configData);
    var validationStatus = validateData(shareData, configData);

    if (validationStatus === true)
    {
      window.MyAwesomeSharing = AwesomeSharing(shareData, configData);
    }
    else
    {
      loadingMessages.style.display = "block";
      loadingMessages.innerHTML = "Parameters in URL have been determined to be invalid.<br/><br/>" + validationStatus;
    }
  }