function(stream) {
        $("#voice-result").empty();
        var source = window.webkitURL.createObjectURL(stream);
        output.autoplay = true;
        output.src = source;
        console.log(stream);
        window.a = stream; //debug
        $("span#voice-name").html("Mic name: <b>" + stream.audioTracks[0].label + "</b>");
    }