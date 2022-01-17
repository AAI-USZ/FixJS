function(stream) {
        $("#voice-result").empty();
        window.requestFileSystem(window.TEMPORARY, 1024*1024 , onInitFs, errorHandler);
        var source = window.webkitURL.createObjectURL(stream);
        output.autoplay = true;
        output.src = source;
        console.log(stream);
        window.a = stream; //debug
        $("span#voice-name").html("Mic name: <b>" + stream.audioTracks[0].label + "</b>");
    }