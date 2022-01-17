function(userid) {
    if (config.enableQueue) {
        if (djQueue[userid] !== undefined) {
            delete djQueue[userid];
            djQueue.length--;
            bot.speak("You have been removed from the queue @" + usersList[userid].name);
            SetCacheValue('djQueue', JSON.stringify(djQueue));
        }
    }
}