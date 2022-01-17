function getCharacterPhrasesAndTiming(configData) {
    var fullUri = decodeURI(window.location.href);
    var getParams = fullUri.slice(fullUri.indexOf('?') + 1).split('&');
    var data = {};
    var readers = {
      readC: function(characterName) { return characterName;      },
      readP: function(phrases)       { return phrases.split(","); },
      readT: function(timings)       { return timings.split(","); }
    };

    for (var i=0; i < getParams.length; i++)
    {
      var dataType = getParams[i].substring(0,1).toUpperCase();
      var funcName = "read" + dataType;
      if (readers[funcName] !== undefined)
      {
        data[dataType] = readers[funcName](
          getParams[i].substring(2, getParams[i].length)
        );
      }
      /*
      else
      {
        loadingMessages.style.display = "block";
        loadingMessages.innerHTML = "Invalid parameters in the link<br/>Found an undefined parameter '" + dataType + "'";
      }
      */
    }

    return data;
  }