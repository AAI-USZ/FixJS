function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
            return;
        }

        var id = args[0],
            audio = audioObjects[id];

        if (!audio) {
            error("Audio Object has not been initialized");
            return;
        }

        success(audio.currentTime);
    }