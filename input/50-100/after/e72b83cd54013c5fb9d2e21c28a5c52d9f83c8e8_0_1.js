function(t) {
    try {
        this.socket.emit('playmusic_order', t);
    } catch(e) {
        console.log(e);
    }
    var timer = (Math.round(t.length)+1) * 1000;
    console.log("start");
    console.log(t);
    console.log(timer);
    var timeoutId = setTimeout(this.emit.bind(this, 'play_done', t), timer);
}