function(data) {
    try {
        delete usersList[data.user[0].userid];
        if (config.enableQueue) {
            if (djQueue[data.user[0].userid].isAfk !== undefined){
                djQueue[data.user[0].userid].isAfk = true;
                djQueue[data.user[0].userid].akfTime = new Date();
                console.log(djQueue);
            }
        }
        if (data.user[0].userid == config.botinfo.userid) {
            killBot("4dfb57154fe7d061dd013a44");
        }

    } catch (e) {
        console.log("*** Error *** " + e);
    }
}