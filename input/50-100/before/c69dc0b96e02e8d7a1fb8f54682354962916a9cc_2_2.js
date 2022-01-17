function (name) {
        // explicit nil handling
        if (!name) {
            return;
        }

        // Is this an alias ?
        if(this._spriteFramesAliases.hasOwnProperty(name)){
            delete(this._spriteFramesAliases[name]);
        }

        if(this._spriteFrames.hasOwnProperty(name)){
            delete(this._spriteFrames[name]);
        }
    }