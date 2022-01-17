function(data) {

    try {

        //Log event in console
        if (config.consolelog) {
            console.log('Joined room: ' + data.user[0].name);
        }

        //Add user to usersList
        var user = data.user[0];
        user.lastActivity = new Date();
        usersList[user.userid] = user;
        if (currentsong !== null) {
            currentsong.listeners++;
        }

        //Add user to user table
        if (config.database.usedb) {
            if (user.name !== null) {
                client.query('INSERT INTO ' + config.database.dbname + '.' + config.database.tablenames.user + ' (userid, username, lastseen)' + 'VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE lastseen = NOW()', [user.userid, user.name]);
            }
        }

        if (config.enableQueue) {
            if (djQueue[data.user[0].userid].isAfk !== undefined){
                djQueue[data.user[0].userid].isAfk = false;
                djQueue[data.user[0].userid].akfTime = null;
            }
            bot.pm("Greetings @" + data.user[0].name + ". If you would like to DJ, please type 'q+' to get added to the queue.", data.user[0].userid);
        }

    } catch (e) {
        console.log("*** Error *** " + e);
    }
}