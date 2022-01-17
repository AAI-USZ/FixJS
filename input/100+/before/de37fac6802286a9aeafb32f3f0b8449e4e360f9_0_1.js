function(data, hashId, key, e) {
        // Initialize the data object.
        if (data.state == null || data.buffer == null) {
            data.state = "start";
            data.buffer = "";
        }

        var keyArray = [];
        if (hashId & 1) keyArray.push("ctrl");
        if (hashId & 8) keyArray.push("command");
        if (hashId & 2) keyArray.push("option");
        if (hashId & 4) keyArray.push("shift");
        if (key)        keyArray.push(key);

        var symbolicName = keyArray.join("-");
        var bufferToUse = data.buffer + symbolicName;

        // Don't add the symbolic name to the key buffer if the alt_ key is
        // part of the symbolic name. If it starts with alt_, this means
        // that the user hit an alt keycombo and there will be a single,
        // new character detected after this event, which then will be
        // added to the buffer (e.g. alt_j will result in ∆).
        //
        // We test for 2 and not for & 2 as we only want to exclude the case where
        // the option key is pressed alone.
        if (hashId != 2) {
            data.buffer = bufferToUse;
        }

        var bufferObj = {
            bufferToUse: bufferToUse,
            symbolicName: symbolicName,
        };

        if (e) {
            bufferObj.keyIdentifier = e.keyIdentifier
        }

        return bufferObj;
    }