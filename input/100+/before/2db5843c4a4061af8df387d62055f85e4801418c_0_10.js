function() {
    qPosn = 0;
    nextDj = null;
    if (config.enableQueue && !waitingOnNextDj) {
        if (djQueue.length > 0) {
            for (var i in djQueue){
                if (djQueue[i].isAfk)
                    djQueue[i].afkCount ++;
                else {
                    nextDj = i;
                    console.log("Next DJ is: " + usersList[nextDj]);
                    break;
                }
            }

            if (nextDj === null) {
                bot.speak("The queue is empty. All DJs in the queue are currently not here. Anyone can DJ at this time!");
                return;
            }

            var text = "It is now @" + djQueue[nextDj].name + "'s turn to DJ! You have " + config.nextDjQueueTimeout + " seconds to step up.";
            waitingOnNextDj = true;
            bot.speak(text);
            bot.pm("It's your turn to DJ.", nextDj);
            nextDjTime = new Date();
            queueRefreshIntervalId = setInterval(CheckForNextDjFromQueue, 5000);
        } else {
            bot.speak("The queue is empty. Anyone can DJ at this time!");
        }
    }
}