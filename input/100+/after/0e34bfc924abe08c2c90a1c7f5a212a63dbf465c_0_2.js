function(typedArrayOrSizeInBytes, usage, indexDatatype) {
        var bytesPerIndex;

        if (indexDatatype === IndexDatatype.UNSIGNED_BYTE) {
            bytesPerIndex = Uint8Array.BYTES_PER_ELEMENT;
        } else if (indexDatatype === IndexDatatype.UNSIGNED_SHORT) {
            bytesPerIndex = Uint16Array.BYTES_PER_ELEMENT;
        } else {
            throw new DeveloperError('Invalid indexDatatype.');
        }

        var gl = this._gl;
        var buffer = createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, typedArrayOrSizeInBytes, usage);
        var numberOfIndices = buffer.getSizeInBytes() / bytesPerIndex;

        buffer.getIndexDatatype = function() {
            return indexDatatype;
        };

        buffer.getBytesPerIndex = function() {
            return bytesPerIndex;
        };

        buffer.getNumberOfIndices = function() {
            return numberOfIndices;
        };

        return buffer;
    }