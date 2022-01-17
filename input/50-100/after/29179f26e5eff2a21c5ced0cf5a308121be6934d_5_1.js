function() {
        // Create a dummy audio placeholder
        var test = new Audio();
        
        // Check for ogg support
        if (test.canPlayType('audio/ogg; codecs="vorbis"')) {
            cp.audio.type = '.ogg'; 
        // Check for mp3 support
        } else if (test.canPlayType('audio/mpeg;')) {
            cp.audio.type = '.mp3';
        } else {
            console.error('This browser does not support .mp3 or .ogg, failed to setup game.');
        }
    }