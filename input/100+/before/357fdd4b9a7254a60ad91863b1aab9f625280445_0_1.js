function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id];

        if (!audio) {
            error("Audio Object has not been initialized");
        } else if (args.length === 1) {
            error("Media seek time argument not found");
        } else {
            try {
                audio.currentTime = args[1];
            } catch (e) {
                error("Error seeking audio: " + e);
            }

            success();
        }

        success();
    }