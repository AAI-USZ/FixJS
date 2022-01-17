function(userid) {
    if (config.enableQueue) {
        if (djQueue[userid] !== undefined) {
            delete djQueue[userid];
            djQueue.length --;
            bot.speak("You have been removed from the queue @" + usersList[userid].name);
            if (config.database.usedb) {
                client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = 'djQueue'", [JSON.stringify(djQueue)]);
            }
        }
    }
}