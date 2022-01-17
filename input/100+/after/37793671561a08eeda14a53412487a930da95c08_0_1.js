function(transport, autoPlay) {
    url = transport.uri.replace("protocol",this.config.protocol);
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
    
    var player;
    if (this.config.direct == true && transport.peerID != undefined && this.config.cirrus != undefined) {
        Phono.log.info("Direct media play with peer " + transport.peerID);
        player = this.$flash.play(luri, autoPlay, transport.peerID, this.config.video);
    }
    else player = this.$flash.play(luri, autoPlay);
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
        volume: function(value) {
   	    if(arguments.length === 0) {
   		return player.getVolume();
   	    }
   	    else {
   		player.setVolume(value);
   	    }
        }
    }
}