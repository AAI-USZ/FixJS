function(arrayViewOrSizeInBytes, usage) {
        return this._createBuffer(this._gl, this._gl.ARRAY_BUFFER, arrayViewOrSizeInBytes, usage);
    }