function createBuffer(gl, bufferTarget, typedArrayOrSizeInBytes, usage) {
        var sizeInBytes;

        if (typeof typedArrayOrSizeInBytes === 'number') {
            sizeInBytes = typedArrayOrSizeInBytes;
        } else if (typeof typedArrayOrSizeInBytes === 'object' && typeof typedArrayOrSizeInBytes.byteLength !== 'undefined') {
            sizeInBytes = typedArrayOrSizeInBytes.byteLength;
        } else {
            throw new DeveloperError('typedArrayOrSizeInBytes must be either a typed array or a number.');
        }

        if (sizeInBytes <= 0) {
            throw new DeveloperError('typedArrayOrSizeInBytes must be greater than zero.');
        }

        if (!BufferUsage.validate(usage)) {
            throw new DeveloperError('usage is invalid.');
        }

        var buffer = gl.createBuffer();
        gl.bindBuffer(bufferTarget, buffer);
        gl.bufferData(bufferTarget, typedArrayOrSizeInBytes, usage);
        gl.bindBuffer(bufferTarget, null);

        return new Buffer(gl, bufferTarget, sizeInBytes, usage, buffer);
    }