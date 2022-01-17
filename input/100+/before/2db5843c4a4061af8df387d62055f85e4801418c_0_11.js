function() {
    if (nextDj !== null) {
        var currentTime = new Date();
        if (currentTime.getTime() - nextDjTime.getTime() > (config.nextDjQueueTimeout * 1000)) {
            var pastDj = djQueue[nextDj];
            pastDj.afkCount ++;

            delete djQueue[nextDj];

            if (pastDj.afkCount >= 2){
                bot.speak("Sorry @" + pastDj.name + ", you missed out! Whatta looser! You can add yourself back to the queue, but pay attention this time.");
            } else {
                djQueue[nextDj] = pastDj;
                bot.speak("Too late @" + usersList[nextDj].name + " you can try once more on the next opening.");
            }

            waitingOnNextDj = false;

            if (config.database.usedb) {
                client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = 'djQueue'", [JSON.stringify(djQueue)]);
            }
            clearInterval(queueRefreshIntervalId);
            NextDjOnQueue();
        }
    }
}