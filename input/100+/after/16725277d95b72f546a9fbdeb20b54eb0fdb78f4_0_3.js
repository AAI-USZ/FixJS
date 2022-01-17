function() {
        var waitingTime = ((new Date()).getTime() - idleDate.getTime()) / 1000;
        waitingTime = Math.floor(waitingTime / 10) * 10;
        var leftTime = 0;
        if (abortTimerTime) {
            leftTime = (abortTimerTime.getTime() - (new Date()).getTime()) / 1000;
            leftTime = Math.floor(leftTime / 10) * 10;
        }
        var mirrorsString = "[" + mirrors.join(",") + "]";
        return "http://" + currentMirror + url + " \t" + (tries + 1) + " tries \t" +
            waitingTime + "/" + leftTime + "s \t" + fileWritten + "/" + fileSize + " \t mirrors:" + mirrorsString + "\t" + that.getStatusBar();
    }