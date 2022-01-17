function(transport, autoPlay) {
    var url = transport.uri;
    var luri = url;
    var uri = Phono.util.parseUri(url);

    if (uri.protocol == "rtp") return null;
    if (url.indexOf("//") == 0) {
        luri = location.protocol+":"+url;
    } else if (uri.protocol.length < 2) {
        // We are relative, so use the document.location
        var location = Phono.util.parseUri(document.location);
        luri = location.protocol+"://"+location.directoryPath.substring(0,location.directoryPath.length)+url;
        luri = encodeURI(luri);
    }

    // Get PhoneGap to create the play
    console.log("play("+luri+","+autoPlay+")");
    PhoneGap.exec( 
                  function(result) {console.log("play success: " + result);},
                  function(result) {console.log("play fail:" + result);},
                  "Phono","play",
                  [{
                      'uri':luri,
                      'autoplay': autoPlay == true ? "YES":"NO"
                  }] );


    return {
        url: function() {
            return luri;
        },
        start: function() {
            console.log("play.start " + luri);
            PhoneGap.exec( 
                          function(result) {console.log("start success: " + result);},
                          function(result) {console.log("start fail:" + result);},
                          "Phono","start",
                          [{
                              'uri':luri
                          }]);
        },
        stop: function() {
            PhoneGap.exec(
                          function(result) {console.log("stop success: " + result);},
                          function(result) {console.log("stop fail:" + result);},
                          "Phono","stop", 
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