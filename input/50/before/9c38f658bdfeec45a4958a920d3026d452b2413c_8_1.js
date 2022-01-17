function (name) {
        if (!name) {
            return;
        }
        delete this._animations[name];
    }