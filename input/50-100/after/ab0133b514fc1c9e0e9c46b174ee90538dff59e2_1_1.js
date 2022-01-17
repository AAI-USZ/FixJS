function(t) {
    try {
        this.socket.emit('playmusic_order', t);
    } catch(e) {
        console.log(e);
    }
    this.current_track = t;
    var timer = (Math.round(t.length)+1) * 1000;
    var timeoutId = setTimeout(this.playing_is_finish.bind(this, t), timer);
}