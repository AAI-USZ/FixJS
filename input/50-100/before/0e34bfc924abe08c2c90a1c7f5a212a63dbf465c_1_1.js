function() {
        var sizeInBytes = 3 * Float32Array.BYTES_PER_ELEMENT;
        var vertices = new ArrayBuffer(sizeInBytes);
        var positions = new Float32Array(vertices);
        positions[0] = 1;
        positions[1] = 2;
        positions[2] = 3;

        buffer = context.createVertexBuffer(sizeInBytes, BufferUsage.STATIC_DRAW);
        buffer.copyFromArrayView(vertices);
    }