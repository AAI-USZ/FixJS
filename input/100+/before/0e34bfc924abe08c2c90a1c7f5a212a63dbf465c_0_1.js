function(gl, bufferTarget, arrayViewOrSizeInBytes, usage) {
        var sizeInBytes;

        if (typeof arrayViewOrSizeInBytes === 'object') {
            sizeInBytes = arrayViewOrSizeInBytes.byteLength;
        } else {
            sizeInBytes = arrayViewOrSizeInBytes;
        }

        if (sizeInBytes <= 0) {
            throw new DeveloperError('arrayViewOrSizeInBytes must be greater than zero.');
        }

        if (!BufferUsage.validate(usage)) {
            throw new DeveloperError('usage is invalid');
        }

        var buffer = gl.createBuffer();
        gl.bindBuffer(bufferTarget, buffer);
        gl.bufferData(bufferTarget, arrayViewOrSizeInBytes, usage);
        gl.bindBuffer(bufferTarget, null);

        return new Buffer(gl, bufferTarget, sizeInBytes, usage, buffer);
    }