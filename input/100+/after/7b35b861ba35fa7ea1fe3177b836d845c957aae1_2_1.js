function onDataLoaded(res) {
    var
        resData, resMeta,
        keyList = [], k,
        offX = 0, offY = 0
    ;

    req = null;

    // no response or response not matching current zoom (too old response)
    if (!res || res.meta.z != zoom) {
        return;
    }

    resMeta = res.meta;
    resData = res.data;

    // offset between old and new data set
    if (meta && data && meta.z == resMeta.z) {
        offX = meta.x-resMeta.x;
        offY = meta.y-resMeta.y;

        // identify already present buildings to fade in new ones
        for (var i = 0, il = data.length; i < il; i++) {
            // id key: x,y of first point - good enough
            keyList[i] = (data[i][1][0]+offX)+","+(data[i][1][1]+offY);
        }
    }

    meta = resMeta;
    data = [];
    for (var i = 0, il = resData.length; i < il; i++) {
        data[i] = resData[i];
        data[i][0] = min(data[i][0], MAX_HEIGHT);
        k = data[i][1][0]+","+data[i][1][1];
        if (keyList && ~~keyList.indexOf(k) > -1) {
            data[i][2] = 1; // mark item "already present""
        }
    }

    resMeta = resData = keyList = null; // gc

    fadeIn();
}