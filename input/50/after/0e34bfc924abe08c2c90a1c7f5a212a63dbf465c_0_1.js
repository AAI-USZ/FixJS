function(typedArrayOrSizeInBytes, usage) {
        return createBuffer(this._gl, this._gl.ARRAY_BUFFER, typedArrayOrSizeInBytes, usage);
    }