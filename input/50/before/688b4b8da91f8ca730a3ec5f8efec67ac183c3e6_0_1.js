function (path, loop) {
        var soundCache = this._getEffectList(path);
        if (soundCache) {
            soundCache.currentTime = 0;
            soundCache.loop = loop || false;
            soundCache.play();
        }
        return path;
    }