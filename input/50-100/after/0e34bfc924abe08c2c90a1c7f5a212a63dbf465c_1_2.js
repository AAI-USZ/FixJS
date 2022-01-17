function() {
        var typedArray = new Float32Array(3 * Float32Array.BYTES_PER_ELEMENT);
        typedArray[0] = 1.0;
        typedArray[1] = 2.0;
        typedArray[2] = 3.0;

        buffer = context.createVertexBuffer(typedArray, BufferUsage.STATIC_DRAW);
        expect(buffer.getSizeInBytes()).toEqual(typedArray.byteLength);
        expect(buffer.getUsage()).toEqual(BufferUsage.STATIC_DRAW);
    }