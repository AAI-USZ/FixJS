function (target, selector, seconds) {
    if (arguments < 2)
        throw new Error("timerWithTarget'argument can't is null");

    var timer = new cc.Timer();
    if (arguments.length == 2) {
        timer.initWithTarget(target, selector, 0, cc.REPEAT_FOREVER, 0);
    } else {
        timer.initWithTarget(target, selector, seconds, cc.REPEAT_FOREVER, 0);
    }
    return timer;
}