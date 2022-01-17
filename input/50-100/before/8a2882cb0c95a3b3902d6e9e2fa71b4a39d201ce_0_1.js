function(t) {
    try {
        this.socket.emit('playmusic_order', t);
    } catch(e) {
        console.log(e);
    }
    var timeoutId = setTimeout(this.emit.bind(this, 'play_done', t), Math.round(t.length) * 1000);
}