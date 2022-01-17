function(t) {
    try {
        this.socket.emit('playmusic_order', t);
    } catch(e) {
        console.log(e);
    }
    this.current_track = t;
    this.current_track_start_time = microtime.now();

    var timer = (Math.round(t.length)+1) * 1000;
    this.current_track_timer = timer;
    this.timeoutId = setTimeout(this.playing_is_finish.bind(this, t), timer);
}