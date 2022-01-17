function(data) {
    if (config.enableQueue) {
        var text = "";
        if (djQueue.length > 0 && (nextDj !== null || nextDj === undefined)) {
            if (data.user[0].userid != nextDj) {
                bot.remDj(data.user[0].userid);
                text = "Sorry @" + usersList[data.user[0].userid].name + ", it's @" + usersList[nextDj].name + " turn. You need to wait your turn.";
                bot.speak(text);
            } else {
                delete djQueue[data.user[0].userid];
                if (config.database.usedb) {
                    client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = 'djQueue'", [JSON.stringify(djQueue)]);
                }
                waitingOnNextDj = false;
                clearInterval(queueRefreshIntervalId);
                nextDj = null;
            }
        }
    }
}