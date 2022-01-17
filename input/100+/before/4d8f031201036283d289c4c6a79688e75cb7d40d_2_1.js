function(transport, autoPlay) {
    var url = transport.uri;
    var luri = url;
    var uri = Phono.util.parseUri(url);

    if (uri.protocol == "rtp") return null;
    if (uri.protocol.length < 2) {
        // We are relative, so use the document.location
        var location = Phono.util.parseUri(document.location);
        luri = location.protocol+"://"+location.directoryPath.substring(0,location.directoryPath.length)+url;
        luri = encodeURI(luri);
    }

    // Get PhoneGap to create the play
    PhoneGap.exec(function(result) {console.log("play: success");},
                  function(result) {console.log("play: fail");},
                  "PhonogapAudio",  
                  "play",              
                  [{
                      'uri':luri,
                      'autoplay': autoPlay == true ? "YES":"NO"
                  }]);      

    return {
        url: function() {
            return luri;
        },
        start: function() {
            console.log("play.start " + luri);
            PhoneGap.exec(function(result) {console.log("start: success");},
                  function(result) {console.log("start: fail");},
                  "PhonogapAudio",  
                  "start",              
                  [{
                      'uri':luri
                  }]);   
        },
        stop: function() {
            console.log("play.stop " + luri);
            PhoneGap.exec(function(result) {console.log("stop: success");},
                  function(result) {console.log("stop: fail");},
                  "PhonogapAudio",  
                  "stop",              
                  [{
                      'uri':luri
                  }]);   

        },
        volume: function() { 
            if(arguments.length === 0) {
                
   	    }
   	    else {
   	    }
        }
    }
}