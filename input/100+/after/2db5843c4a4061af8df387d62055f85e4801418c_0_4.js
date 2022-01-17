function(data) {
    try {

        //Log event in console
        if (config.consolelog) {
            console.log('Left room: ' + data.user[0].name);
        }

        if (config.enableQueue) {
            if (djQueue[data.user[0].userid] !== undefined) {
                djQueue[data.user[0].userid].isAfk = true;
                djQueue[data.user[0].userid].akfTime = new Date();
                djQueue.length--;
                SetCacheValue('djQueue', JSON.stringify(djQueue));
            }
        }

        delete usersList[data.user[0].userid];

        if (data.user[0].userid == config.botinfo.userid) {
            killBot("4dfb57154fe7d061dd013a44");
        }

    } catch (e) {
        console.log("*** Error *** " + e);
    }
}