function(config) {
    if (config.data && goog.isFunction(config.data)) {
        config = config.data();
    }
    this.config = config;
    this.tracks = {};
    
    if (lime.audio.AudioContext) {
        var path;
        for (var i = 0; i < config['resources'].length; i++) {
            if (/\.mp3/i.test(config['resources'][i])) {
                path = config['resources'][i];
                continue;
            }
        }
        this.sprites = {};
        this.numSprites = 0;
        var loadedSprites = 0;
        var self = this;
        var keys = Object.keys(config['spritemap']);
        console.log(keys, config);
        for (i = 0; i < keys.length; i++) {
            this.numSprites++;
            var spritePath = path.replace(/(.*)\.(.*?$)/,'$1_' + goog.string.padNumber(this.numSprites, 3) + '.$2');
            var audio = new lime.audio.Audio(spritePath);
            this.sprites[keys[i]] = {path: spritePath, audio: audio};
        }
    }
    else if (lime.userAgent.IOS || lime.userAgent.WINPHONE) {
        goog.events.listenOnce(goog.global, lime.userAgent.SUPPORTS_TOUCH ? 'touchstart' : 'mousedown', this._initPlayer, true, this);
    }
    else {
        this._initPlayer();
    }        
}