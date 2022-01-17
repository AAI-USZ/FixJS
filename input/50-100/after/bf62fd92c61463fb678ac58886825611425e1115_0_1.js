function() {
        var rawPads = getField();
        var len = (rawPads) ? rawPads.length : 0;
        for (var i = 0; i < len; ++i) {
            mapIndividualPad(rawPads, i);
        }
        for (; i < curData.length; ++i) {
            prevData[i] = undefined;
            curData[i] = undefined;
        }
        return curData;
    }