function (path, loop) {
        var soundCache = this._getEffectList(path);
        if (soundCache) {
            soundCache.loop = loop || false;
            soundCache.play();
        }
        return path;
    }