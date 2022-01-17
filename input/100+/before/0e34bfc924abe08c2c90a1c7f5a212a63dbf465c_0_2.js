function(arrayViewOrSizeInBytes, usage, indexDatatype) {
        var gl = this._gl;
        var bytesPerIndex;

        if (indexDatatype === IndexDatatype.UNSIGNED_BYTE) {
            bytesPerIndex = Uint8Array.BYTES_PER_ELEMENT;
        } else if (indexDatatype === IndexDatatype.UNSIGNED_SHORT) {
            bytesPerIndex = Uint16Array.BYTES_PER_ELEMENT;
        } else {
            throw new DeveloperError('Invalid indexDatatype.');
        }

        var buffer = this._createBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, arrayViewOrSizeInBytes, usage);
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