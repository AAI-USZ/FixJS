function (name) {
        if (!name) {
            return;
        }
        if (this._animations.hasOwnProperty(name)) {
            delete this._animations[name];
        }
    }