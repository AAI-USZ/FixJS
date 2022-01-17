function() {
    if (nextDj !== null) {
        var currentTime = new Date();
        if (currentTime.getTime() - nextDjTime.getTime() > (config.nextDjQueueTimeout * 1000)) {
            var pastDj = djQueue[nextDj];
            console.log(pastDj);
            pastDj.afkCount++;

            delete djQueue[nextDj];
            djQueue.length--;

            if (pastDj.afkCount >= 2) {
                bot.speak("Sorry @" + pastDj.name + ", you missed out! Whatta looser! You can add yourself back to the queue, but pay attention this time.");
            } else {
                djQueue[nextDj] = pastDj;
                djQueue.length++;
                bot.speak("Too late @" + pastDj.name + " you can try once more on the next opening.");
            }

            waitingOnNextDj = false;

            SetCacheValue('djQueue', JSON.stringify(djQueue));
            clearInterval(queueRefreshIntervalId);
            NextDjOnQueue();
        }
    }
}