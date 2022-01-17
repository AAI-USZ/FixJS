function() {
        var typedArray = new Uint16Array(3 * Uint16Array.BYTES_PER_ELEMENT);
        typedArray[0] = 1;
        typedArray[1] = 2;
        typedArray[2] = 3;

        buffer = context.createIndexBuffer(typedArray, BufferUsage.STATIC_DRAW, IndexDatatype.UNSIGNED_SHORT);
        expect(buffer.getSizeInBytes()).toEqual(typedArray.byteLength);
        expect(buffer.getUsage()).toEqual(BufferUsage.STATIC_DRAW);
        expect(buffer.getIndexDatatype()).toEqual(IndexDatatype.UNSIGNED_SHORT);
    }