function (name) {
        // explicit nil handling
        if (!name) {
            return;
        }

        // Is this an alias ?
        if (this._spriteFramesAliases.hasOwnProperty(name)) {
            delete(this._spriteFramesAliases[name]);
        }
        if (this._spriteFrames.hasOwnProperty(name)) {
            delete(this._spriteFrames[name]);
        }
        // XXX. Since we don't know the .plist file that originated the frame, we must remove all .plist from the cache
        this._loadedFileNames = {};
    }