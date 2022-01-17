function(data) {

    try {

        if (config.consolelog) {
            //console.log('Room Changed',  data);
            console.log('Moderator IDs', data.room.metadata.moderator_id);
            console.log('DJs', data.room.metadata.djs);
        }

        djs = data.room.metadata.djs;
        moderators = data.room.metadata.moderator_id;

        //Fill currentsong array with room data
        if ((data.room !== null) && (data.room.metadata !== null)) {
            if (data.room.metadata.current_song !== null) {
                populateSongData(data);
            }
        }

        //Repopulates usersList array.
        var users = data.users;
        for (var i in users) {
            var user = users[i];
            user.lastActivity = new Date();
            usersList[user.userid] = user;
        }

        //Adds all active users to the users table - updates lastseen if we've seen
        //them before, adds a new entry if they're new or have changed their username
        //since the last time we've seen them
        if (config.database.usedb) {
            for (i in users) {
                if (users[i].name !== null) {
                    client.query('INSERT INTO ' + config.database.dbname + '.' + config.database.tablenames.user + ' (userid, username, lastseen)' + 'VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE lastseen = NOW()', [users[i].userid, users[i].name]);
                }
            }
        }

        UpdateDjs(function() {});

        /* Notify the next DJ on the list */
        NextDjOnQueue();

        bot.speak("Ready to serve!");

    } catch (e) {
        console.log("*** Error *** " + e);
    }

}