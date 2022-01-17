function() {
    this.setProperty("has_html5_websocket", typeof WebSocket != "undefined");
    this.setProperty("has_html5_video", !!document.createElement('video').canPlayType);
    this.setProperty("has_html5_webrtc", typeof navigator.webkitGetUserMedia != "undefined");
    log("detecting HTML support websocket=" + this.has_html5_websocket + " video=" + this.has_html5_video + " webrtc=" + this.has_html5_webrtc);
    if (!this.has_html5_websocket || !this.has_html5_video || !this.has_html5_webrtc) {
        $("webrtc-network").innerHTML += '<font color="red">Some HTML5 features are missing in your browser</font>';
    }
    
    if (this.has_html5_websocket) {
        // SIP over websocket works
        this.setProperty("network_status", "available");
        this.enableButtons(true);
        this.enableBox('config', true);
        $("websocket_path").value = this.websocket_path;
        $("listen_ip").style.visibility = "hidden";
        
        this.listen_ip = 'r' + Math.floor(Math.random() * 10000000000) + ".invalid";
        this._listen_port = 0;

        if (this.outbound_proxy_address == "127.0.0.1:5060") {
            var outbound_proxy_address = "127.0.0.1:5080";
            if (window.location.href) {
                var uri = sip.parse_uri(window.location.href);
                outbound_proxy_address = uri.host + ":" + (uri.port ? uri.port : 80);
            }
            this.setProperty("outbound_proxy", true);
            this.setProperty("outbound_proxy_address", outbound_proxy_address);
        }
    }
    
    if (this.has_html5_video) {
        // add <video> to local and remote video boxes
        var local = document.createElement("video");
        local.id = "html5-local-video";
        local.style.width = "240";
        local.style.height = "168";
//        local.style.backgroundColor = "#000000";
        local.autoplay = "autoplay";
        $('local-video').appendChild(local);
        
        var remote = document.createElement("video");
        remote.id = "html5-remote-video";
        remote.style.width = "240";
        remote.style.height = "168";
//        remote.style.backgroundColor = "#000000";
        remote.autoplay = "autoplay";
        $('remote-video').appendChild(remote);
        
        var audio = document.createElement("audio");
        audio.id = "html5-audio";
        audio.autoplay = "autoplay";
        $("webrtc-network").appendChild(audio);
    }
}