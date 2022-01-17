function(userid, position) {
    var text = "";

    if (config.enableQueue) { /* Check if they are a DJ */
        if (djs.indexOf(userid) == -1) { /* Check if they are already on the queue*/
            if (djQueue.indexOf(userid) == -1) {
                djQueue.splice((position - 1), 0, userid);
                text = "@" + usersList[userid].name + ", you have been added to the queue. There is a total of " + djQueue.length + " now.";
                bot.speak(text);
                console.log(djQueue);
                if (config.database.usedb) {
                    client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = 'djQueue'", [JSON.stringify(djQueue)]);
                }
            }
        }
    }
}