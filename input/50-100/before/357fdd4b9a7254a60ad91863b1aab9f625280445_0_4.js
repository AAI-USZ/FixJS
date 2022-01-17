function (success, error, args) {
        error = error || noop;
        success = success || noop;
        if (!args.length) {
            error("Media Object id was not sent in arguments");
        }

        var id = args[0],
            audio = audioObjects[id];

        if (audio) {
            audioObjects[id] = undefined;
            audio.src = undefined;
            //delete audio;
        }

        success();
    }