function now() {
    var performance = window.performance;

    if (performance && performance.now)
        return performance.now();
    else {
        if (performance && performance.webkitNow)
            return performance.webkitNow();
        else
            return Date().getTime();
    }
}