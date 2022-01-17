function() {

    if (config.enableQueue) {
        var djList = "";

        for (var i in djQueue) {
            var queuedDj = djQueue[i];
            console.log(queuedDj);
            if (!queuedDj.isAfk && queuedDj.name !== undefined) {
                djList += queuedDj.name + ", ";
            }
        }

        if (djList !== "") {
            var text = djQueue.length + " DJ(s) in the queue. They are: " + djList;
            bot.speak(text);
        } else {
            bot.speak("Queue is empty!");
        }
    }
}