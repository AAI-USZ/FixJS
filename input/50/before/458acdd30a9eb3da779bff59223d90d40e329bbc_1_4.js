function set_timer_interval(interval) {
    timer_interval = interval;
    clearInterval(timer);
    if (timer_interval != null) {
        timer = setInterval('partial_update()', timer_interval);
    }
}