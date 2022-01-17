function(transport, autoPlay) {
    var url = transport.uri;
    var applet = this.$applet[0];
    var player;
    var luri = url;
    var uri = Phono.util.parseUri(url);
    var location = Phono.util.parseUri(document.location);

    if (uri.protocol == "rtp") return null;
    if (url.indexOf("//") == 0) {
        luri = location.protocol+":"+url;
    } else if (uri.protocol.length < 2) {
        // We are relative, so use the document.location
        luri = location.protocol+"://"+location.authority+location.directoryPath+url;
    }

    if (autoPlay === undefined) autoPlay = false;
    player = applet.play(luri, autoPlay);
    return {
        url: function() {
            return player.getUrl();
        },
        start: function() {
            player.start();
        },
        stop: function() {
            player.stop();
        },
        volume: function() { 
            if(arguments.length === 0) {
   		return player.volume();
   	    }
   	    else {
   		player.volume(value);
   	    }
        }
    }
}