function(userid) {
    var text = "";

    if (config.enableQueue) { /* Check if they are a DJ */
        if (djs.indexOf(userid) == -1) { /* Check if they are already on the queue*/
            if (djQueue[userid] === undefined) {
                djQueue[userid] = {
                    "id": userid,
                    "name": usersList[userid].name,
                    "isAfk": false,
                    "akfCount": 0,
                    "akfTime": null
                };
                djQueue.length ++;

                text = "@" + djQueue[userid].name + ", you have been added to the queue. There is a total of " + djQueue.length + " now.";
                bot.speak(text);
                if (config.database.usedb) {
                    client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = 'djQueue'", [JSON.stringify(djQueue)]);
                }
            }
        } else {
            text = "@" + usersList[userid].name + ", seriously?!? Can't you wait until you're OFF the TABLE before adding yourself to the queue again? FAIL! ";
            bot.speak(text);
        }
    }
}