function (blendFunc) {
        if (this._blendFunc.src != blendFunc.src || this._blendFunc.dst != blendFunc.dst) {
            this._blendFunc = blendFunc;
            this._updateBlendFunc();
        }
    }