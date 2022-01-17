function() {

    if (config.enableQueue) {
        var djList = "";

        for (var i in djQueue) {
            var queuedDj = djQueue[i];
            console.log(queuedDj);
            if (!queuedDj.isAfk) {
                if (queuedDj.name !== undefined){
                    djList += queuedDj.name + ", ";
                }
            } else {
                var now = new Date();
                var afkTime = new Date(queuedDj.akfTime);
                var afkFor = dateDiff(now, afkTime, 'min');
                console.log(afkFor);
                if (queuedDj.isAfk && afkFor >= 5) {
                    console.log("Remove DJ: " + djQueue[i].name);
                    delete djQueue[i];
                }
            }
        }

        if (djList !== "") {
            var text = djQueue.length + " DJ(s) in the queue. They are: " + djList;
            bot.speak(text.substring(0, text.length - 2));
        } else {
            bot.speak("Queue is empty!");
        }
        SetCacheValue('djQueue', JSON.stringify(djQueue));
    }
}