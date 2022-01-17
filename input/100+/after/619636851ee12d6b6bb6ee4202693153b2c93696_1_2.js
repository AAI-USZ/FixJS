function(sprite, opt_loop) {
    if (lime.audio.AudioContext) {
        var spriteObj = this.sprites[sprite];
        if (spriteObj) {
            var audio = new lime.audio.Audio(spriteObj.path);
            audio.play(opt_loop);
            var id = (Math.random() * 1e6) | 0;
            this.tracks[id] = audio;
            goog.events.listen(audio, 'ended', function(e) {
                if (!audio.loop_) {
                    delete this.tracks[id];
                };
            }, false, this);
        }
    }
    else if (this.player && this.config.spritemap[sprite] && !lime.audio.getMute()) {
        this.player.play(sprite, true);
        var ctx = (this.player.context);
        if (!ctx.duration || ctx.buffered.end(0) | 0 < ctx.duration | 0) return;
        if (lime.audio._playQueue.indexOf(this) == -1) {
          lime.audio._playQueue.push(this);
        }
    }
}