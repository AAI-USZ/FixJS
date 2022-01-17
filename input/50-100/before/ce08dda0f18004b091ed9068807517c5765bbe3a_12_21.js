function (/* Multi arguments */) {
    var animate = new cc.Animate();
    if (arguments.length == 3) {
        animate.initWithDuration(arguments[0], arguments[1], arguments[2]);
    } else {
        animate.initWithAnimation(arguments[0], arguments[1]);
    }

    return animate;
}