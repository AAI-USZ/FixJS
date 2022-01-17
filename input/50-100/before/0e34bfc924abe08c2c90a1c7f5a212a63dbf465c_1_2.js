function() {
        buffer = context.createIndexBuffer(6, BufferUsage.STREAM_DRAW, IndexDatatype.UNSIGNED_SHORT);

        expect(buffer.getSizeInBytes()).toEqual(6);
        expect(buffer.getUsage()).toEqual(BufferUsage.STREAM_DRAW);

        expect(buffer.getIndexDatatype()).toEqual(IndexDatatype.UNSIGNED_SHORT);
        expect(buffer.getBytesPerIndex()).toEqual(2);
        expect(buffer.getNumberOfIndices()).toEqual(3);
    }