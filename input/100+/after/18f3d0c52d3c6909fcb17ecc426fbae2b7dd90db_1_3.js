function generateShareLink() 
      {
        var phrases = timing = "";
        for (var i=0; i < recording.length; i++)
        {
          phrases += recording[i].PHRASE + ",";
          timing  += recording[i].TIME   + ",";
        }
        phrases = phrases.substring(0, phrases.length-1);
        timing  = timing .substring(0, timing .length-1);
        var fullPath = window.location.href;
        return decodeURI(fullPath.substring(0, fullPath.lastIndexOf("/") + 1) + "sharing.htm" +
               "?c=" + character +
               "&p=" + phrases   +
               "&t=" + timing);
      }